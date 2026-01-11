import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

// MUST be 32 bytes (64 hex chars)
const SECRET_KEY = Buffer.from(process.env.MESSAGE_SECRET, "hex");

export const encryptText = (text) => {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return {
    encryptedContent: encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
};

export const decryptText = (message) => {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    SECRET_KEY,
    Buffer.from(message.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(message.authTag, "hex"));

  let decrypted = decipher.update(message.encryptedContent, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
