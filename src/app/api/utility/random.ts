import crypto from "crypto";

export function generateRandom(bytes: number) {
  const n = crypto.randomBytes(bytes).toString("hex");
  return n;
}
export async function generateRandomAsync(bytes: number) {
  const n = crypto.randomBytes(bytes).toString("hex");
  return n;
}
