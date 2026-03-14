import { adminAuth } from "./firebase-admin";
import { cookies } from "next/headers";

export async function getFirebaseUser() {
  const sessionCookie = (await cookies()).get("__session")?.value;
  if (!sessionCookie || !adminAuth) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(sessionCookie);
    return decodedToken;
  } catch (error) {
    return null;
  }
}
