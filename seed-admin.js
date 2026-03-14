/**
 * One-time script: Create admin Firebase user + set ADMIN role in DB
 * Run with: node --env-file=.env seed-admin.js
 */

const admin = require("firebase-admin");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  const email = "support@techiehelp.in";
  const password = "Amitkumar12@";

  let uid;

  try {
    const existingUser = await admin.auth().getUserByEmail(email);
    uid = existingUser.uid;
    console.log(`ℹ️  Firebase user already exists (uid: ${uid})`);
    await admin.auth().updateUser(uid, { password });
    console.log("✅ Password updated.");
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      const newUser = await admin.auth().createUser({
        email,
        password,
        displayName: "TechieHelp Admin",
        emailVerified: true,
      });
      uid = newUser.uid;
      console.log(`✅ Firebase user created (uid: ${uid})`);
    } else {
      throw err;
    }
  }

  // Upsert DB record with ADMIN role
  const dbUser = await prisma.user.upsert({
    where: { uid },
    create: {
      uid,
      email,
      name: "TechieHelp Admin",
      role: "ADMIN",
    },
    update: {
      role: "ADMIN",
      name: "TechieHelp Admin",
    },
  });

  console.log(`✅ DB user ready — role: ${dbUser.role}, id: ${dbUser.id}`);
  console.log("\n🎉 Done! Login at /sign-in with:");
  console.log(`   Email   : ${email}`);
  console.log(`   Password: ${password}`);
  console.log("   Then visit: /internship/admin/dashboard\n");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
