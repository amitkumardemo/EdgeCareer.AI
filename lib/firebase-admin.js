import admin from "firebase-admin";

// Use globalThis for singleton behavior in development (hot reloading)
if (!admin.apps.length) {
  try {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
      console.warn("⚠️ Firebase Admin credentials missing in .env. Server-side features will be limited.");
    } else {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
      });
      console.info("✅ Firebase Admin initialized successfully (Singleton).");
    }
  } catch (error) {
    console.error("❌ Firebase Admin Initialization Error:", error.message);
  }
}

const adminAuth = globalThis.adminAuth || (admin.apps.length ? admin.auth() : null);
const adminDb = globalThis.adminDb || (admin.apps.length ? admin.firestore() : null);

if (process.env.NODE_ENV !== "production") {
  globalThis.adminAuth = adminAuth;
  globalThis.adminDb = adminDb;
}

export { adminAuth, adminDb };
export default admin;
