import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
