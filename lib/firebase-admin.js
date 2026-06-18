// Lazy-loaded firebase-admin using dynamic imports.
// Avoids ERR_REQUIRE_ESM by deferring the import until runtime
// (not at module evaluation time). Singleton ensures one init per process.

let _adminAuth = null;
let _adminDb = null;
let _initialized = false;
let _initPromise = null;

async function initFirebaseAdmin() {
  if (_initialized) return;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    try {
      const { getApps, initializeApp, cert } = await import("firebase-admin/app");
      const { getAuth } = await import("firebase-admin/auth");
      const { getFirestore } = await import("firebase-admin/firestore");

      if (!getApps().length) {
        if (
          !process.env.FIREBASE_PROJECT_ID ||
          !process.env.FIREBASE_PRIVATE_KEY ||
          !process.env.FIREBASE_CLIENT_EMAIL
        ) {
          console.warn(
            "⚠️ Firebase Admin credentials missing in .env. Server-side features will be limited."
          );
          return;
        }
        initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          }),
          databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
        });
        console.info("✅ Firebase Admin initialized successfully (Singleton).");
      }

      _adminAuth = getAuth();
      _adminDb = getFirestore();
      _initialized = true;
    } catch (error) {
      console.error("❌ Firebase Admin Initialization Error:", error.message);
    }
  })();

  return _initPromise;
}

// Returns adminAuth — initializes firebase-admin on first call
export async function getAdminAuth() {
  await initFirebaseAdmin();
  return _adminAuth;
}

// Returns adminDb — initializes firebase-admin on first call
export async function getAdminDb() {
  await initFirebaseAdmin();
  return _adminDb;
}

// Legacy sync exports — still work but may be null until first async call
// Use getAdminAuth() / getAdminDb() for guaranteed initialization
export { _adminAuth as adminAuth, _adminDb as adminDb };
export default { getAdminAuth, getAdminDb };
