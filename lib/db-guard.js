/**
 * Database Resilience & Fault Isolation Utility with Circuit Breaker
 * TechieHelp Institute of AI
 * 
 * Provides production-grade error isolation for Prisma, Firebase, and external services.
 * Features an intelligent Circuit Breaker: when database quota limits or downtime occurs,
 * it trips and immediately returns graceful fallbacks, preventing connection churn,
 * Prisma log spam, and Next.js dev overlay errors.
 */

import { NextResponse } from "next/server";

const CIRCUIT_COOLDOWN_MS = 60000; // 60 seconds cooldown window

// Global circuit state across module reloads
const globalState = globalThis;
if (globalState._dbCircuitOpenUntil === undefined) {
  globalState._dbCircuitOpenUntil = 0;
  globalState._dbCircuitReason = "";
}

/**
 * Checks if the database circuit breaker is currently open (fast-failing).
 */
export function isCircuitBreakerOpen() {
  return Date.now() < (globalState._dbCircuitOpenUntil || 0);
}

/**
 * Trips the circuit breaker for a cooldown period.
 */
export function tripCircuitBreaker(reason = "Database quota exceeded or service unavailable") {
  const now = Date.now();
  if (now >= (globalState._dbCircuitOpenUntil || 0)) {
    console.warn(`[DB-CIRCUIT-BREAKER] Circuit TRIPPED: ${reason}. Serving fast fallbacks for 60s.`);
  }
  globalState._dbCircuitOpenUntil = now + CIRCUIT_COOLDOWN_MS;
  globalState._dbCircuitReason = reason;
}

/**
 * Manually resets the circuit breaker.
 */
export function resetCircuitBreaker() {
  globalState._dbCircuitOpenUntil = 0;
  globalState._dbCircuitReason = "";
}

/**
 * Checks if an error is related to database quota limits or connection availability.
 */
export function isDbQuotaOrConnectionError(error) {
  if (!error) return false;
  const msg = String(error?.message || "").toLowerCase();
  const name = String(error?.name || "");
  const code = String(error?.code || "");

  return (
    name === "PrismaClientInitializationError" ||
    name === "PrismaClientRustPanicError" ||
    msg.includes("quota") ||
    msg.includes("exceeded the quota") ||
    msg.includes("upgrade your plan") ||
    msg.includes("connection pool") ||
    msg.includes("timed out fetching a new connection") ||
    msg.includes("can't reach database server") ||
    msg.includes("connection refused") ||
    msg.includes("too many connections") ||
    code === "P1000" ||
    code === "P1001" ||
    code === "P1002" ||
    code === "P1008" ||
    code === "P1017"
  );
}

/**
 * Executes a database query safely with circuit-breaker protection and fallback.
 * 
 * @param {Function} queryFn - Async function performing the database operation
 * @param {any} fallback - Fallback value to return if query fails (default: null)
 * @param {string} context - Context string for structured logging
 * @returns {Promise<{ data: any, error: any, success: boolean, isDbDown: boolean, circuitOpen: boolean }>}
 */
export async function safeDbQuery(queryFn, fallback = null, context = "Database Query") {
  // If circuit breaker is already open, immediately return fallback without touching DB
  if (isCircuitBreakerOpen()) {
    return {
      data: fallback,
      error: null,
      success: false,
      isDbDown: true,
      circuitOpen: true,
    };
  }

  try {
    const data = await queryFn();
    return {
      data: data !== undefined && data !== null ? data : fallback,
      error: null,
      success: true,
      isDbDown: false,
      circuitOpen: false,
    };
  } catch (error) {
    const isDbDown = isDbQuotaOrConnectionError(error);

    if (isDbDown) {
      tripCircuitBreaker(error?.message?.split("\n")?.[0] || "Database quota exceeded");
      // Use console.warn instead of console.error so Turbopack dev overlay does not flag as runtime crash
      console.warn(`[DB-SAFE] ${context}: Serving fallback due to database limits/outage.`);
    } else {
      console.warn(`[DB-SAFE] ${context} error (handled):`, error?.message || error);
    }

    return {
      data: fallback,
      error,
      success: false,
      isDbDown,
      circuitOpen: isDbDown,
    };
  }
}

/**
 * Convenience helper returning just the query result or fallback data directly.
 * Ideal for Server Components and Page data-fetching.
 * 
 * @param {Function} queryFn - Async function performing the database operation
 * @param {any} fallback - Fallback value if query fails
 * @param {string} context - Context name for logs
 * @returns {Promise<any>}
 */
export async function safeDb(queryFn, fallback = null, context = "safeDb") {
  const result = await safeDbQuery(queryFn, fallback, context);
  return result.data;
}

/**
 * Standard API Route Error Handler.
 * Returns structured JSON with safe messages and correct HTTP status codes.
 * Prevents stack trace or credential leaks to the client.
 * 
 * @param {Error|any} error - Caught error
 * @param {string} customMessage - User-facing friendly message
 * @returns {NextResponse}
 */
export function handleApiError(error, customMessage = "An unexpected error occurred. Please try again.") {
  const isDbDown = isDbQuotaOrConnectionError(error);

  if (isDbDown) {
    tripCircuitBreaker(error?.message?.split("\n")?.[0] || "Database quota exceeded");
    return NextResponse.json(
      {
        success: false,
        error: "Database service is temporarily experiencing high load or undergoing maintenance. Please try again later.",
        code: "DATABASE_UNAVAILABLE",
      },
      { status: 503 }
    );
  }

  console.warn("[API-ERROR-HANDLER]", {
    errorType: error?.name,
    errorCode: error?.code,
    message: error?.message,
  });

  return NextResponse.json(
    {
      success: false,
      error: customMessage,
      code: error?.code || "INTERNAL_SERVER_ERROR",
    },
    { status: 500 }
  );
}
