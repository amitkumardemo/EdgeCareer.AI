import { getFirebaseUser } from "./auth-utils";
import db from "./prisma";

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
      return loggedInUser;
    }

    const newUser = await db.user.create({
      data: {
        uid: uid,
        name: name || email?.split("@")[0] || "User",
        imageUrl: picture || null,
        email: email || "",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};
