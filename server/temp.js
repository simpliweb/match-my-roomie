const fs = require('fs');
const crypto = require('crypto');

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(64).toString('base64');
  return secretKey;
};

const secretKey = generateSecretKey();
fs.appendFileSync('.env', `\nSECRET_KEY=${secretKey}\n`);

console.log('Secret key generated and appended to .env file.');