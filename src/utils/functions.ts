const crypto = require('crypto');

const iterations = 100000;
const keyLength = 64;
const digest = 'sha512';

const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#,;()$%^&*-/.])(?=.{8,})',
);
const emailRegex = new RegExp(
  '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
);
  
export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
  return { salt, hashedPassword };
}

export const verifyPassword = (inputPassword: string, storedSalt: string, storedHash: string) => {
  const hashToVerify = crypto.pbkdf2Sync(inputPassword, storedSalt, iterations, keyLength, digest).toString('hex');
  return hashToVerify === storedHash;
}

export const isValidEmail = (input: string) => emailRegex.test(input);
export const isValidPassword = (input: string) => passwordRegex.test(input);

export const isJSON = (input: string) => {
  try {
    const parsed = JSON.parse(input);
    return { result: true, value: parsed };
  } catch (error) {
    return { result: false };
  }
}