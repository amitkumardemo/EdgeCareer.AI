import { getAdminAuth } from "./firebase-admin";
import { cookies } from "next/headers";

export async function getFirebaseUser() {
  const sessionCookie = (await cookies()).get("__session")?.value;
  if (!sessionCookie) return null;

  try {
    const auth = await getAdminAuth();
    if (!auth) return null;
    const decodedToken = await auth.verifyIdToken(sessionCookie);
    return decodedToken;
  } catch (error) {
    return null;
  }
}
