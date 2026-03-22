import { getFirebaseUser } from "./auth-utils";
import db from "./prisma";

/**
 * Generates a unique TechieHelp student ID in the format TECHIE + 4 random digits
 * Retries if the generated ID already exists in the database.
 */
async function generateUniqueTechieId() {
  const maxRetries = 10;
  for (let i = 0; i < maxRetries; i++) {
    const digits = Math.floor(1000 + Math.random() * 9000); // 1000-9999
    const techieId = `TECHIE${digits}`;
    const existing = await db.user.findUnique({ where: { techieId } });
    if (!existing) return techieId;
  }
  // Fallback: use timestamp-based uniqueness
  return `TECHIE${Date.now().toString().slice(-4)}`;
}

export const checkUser = async () => {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) {
    return null;
  }

  const { uid, email, name, picture } = firebaseUser;

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        uid: uid,
      },
    });

    if (loggedInUser) {
      // If existing user doesn't have a techieId yet (legacy accounts), assign one now
      if (!loggedInUser.techieId) {
        const techieId = await generateUniqueTechieId();
        const updated = await db.user.update({
          where: { uid },
          data: { techieId },
        });
        return updated;
      }
      return loggedInUser;
    }

    // Brand new user — generate ID on creation
    const techieId = await generateUniqueTechieId();

    const newUser = await db.user.create({
      data: {
        uid: uid,
        name: name || email?.split("@")[0] || "User",
        imageUrl: picture || null,
        email: email || "",
        techieId,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};
