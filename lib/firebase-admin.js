import admin from "firebase-admin";

let adminAuth;
let adminDb;

try {
  if (!admin.apps.length) {
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
      console.log("✅ Firebase Admin initialized successfully.");
    }
  }
  
  if (admin.apps.length) {
    adminAuth = admin.auth();
    adminDb = admin.firestore();
  }
} catch (error) {
  console.error("❌ Firebase Admin Initialization Error:", error.message);
}

export { adminAuth, adminDb };
export default admin;
