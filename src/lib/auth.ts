
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function getUser() {
  const token = cookies().get("_token")?.value;
  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    return user;
  } catch {
    return null;
  }
}
