const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'secret';
const token = jwt.sign({ client: 'casanare-form' }, secret, { expiresIn: '24h' });

console.log('Generated JWT Token:');
console.log(token);
console.log('\nUse in requests:');
console.log(`Authorization: Bearer ${token}`);
