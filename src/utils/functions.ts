const crypto = require('crypto');

const iterations = 100000;
const keyLength = 64;
const digest = 'sha512';
  
export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest).toString('hex');
  return { salt, hashedPassword };
}

export const verifyPassword = (inputPassword: string, storedSalt: string, storedHash: string) => {
  const hashToVerify = crypto.pbkdf2Sync(inputPassword, storedSalt, iterations, keyLength, digest).toString('hex');
  return hashToVerify === storedHash;
}