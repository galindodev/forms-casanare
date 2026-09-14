import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';

const payload = {
  userId: 'test-user',
  email: 'test@example.com',
  role: 'admin',
};

const token = jwt.sign(payload, secret, { expiresIn: '24h' });

console.log('Bearer token (valid 24h):');
console.log(token);
console.log('\nUse in curl:');
console.log(`curl -H "Authorization: Bearer ${token}" http://localhost:3000/api/registrations`);
