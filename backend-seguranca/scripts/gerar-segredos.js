// Uso: npm run segredos -- "SenhaDoCliente"
const crypto = require('crypto');
const { authenticator } = require('otplib');
const senha = process.argv[2];
const salt = crypto.randomBytes(16);
console.log('SESSION_SECRET=' + crypto.randomBytes(48).toString('base64url'));
console.log('DATA_KEY=' + crypto.randomBytes(32).toString('base64'));
const totp = authenticator.generateSecret();
console.log('CLIENT_TOTP_SECRET=' + totp);
console.log('# Cadastre no app autenticador (Google Authenticator, Authy):');
console.log('# otpauth://totp/TaxSolut:cliente?secret=' + totp + '&issuer=TaxSolut');
if (senha) console.log('CLIENT_PASS_HASH=' + salt.toString('hex') + ':' + crypto.scryptSync(senha, salt, 64).toString('hex'));
else console.log('# Passe a senha como argumento para gerar CLIENT_PASS_HASH');
