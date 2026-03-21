const admin = require('firebase-admin');
require('dotenv').config();

console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
const pk = process.env.FIREBASE_PRIVATE_KEY;
console.log("FIREBASE_PRIVATE_KEY starts with:", pk?.substring(0, 20));

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: pk?.replace(/\\n/g, "\n"),
    }),
  });
  console.log("✅ Success!");
} catch (e) {
  console.error("❌ Failed:", e.message);
}
