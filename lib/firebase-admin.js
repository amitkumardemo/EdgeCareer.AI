import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Use globalThis for singleton behavior in development (hot reloading)
if (!getApps().length) {
  try {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
      console.warn("⚠️ Firebase Admin credentials missing in .env. Server-side features will be limited.");
    } else {
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
  } catch (error) {
    console.error("❌ Firebase Admin Initialization Error:", error.message);
  }
}

const apps = getApps();
const adminAuth = globalThis.adminAuth || (apps.length ? getAuth() : null);
const adminDb = globalThis.adminDb || (apps.length ? getFirestore() : null);

if (process.env.NODE_ENV !== "production") {
  globalThis.adminAuth = adminAuth;
  globalThis.adminDb = adminDb;
}

export { adminAuth, adminDb };
export default { auth: getAuth, firestore: getFirestore };
