import { registerAs } from '@nestjs/config';
import { getJwtSecret } from './jwt-secret';

export default registerAs('jwt', () => ({
  secret: getJwtSecret(),
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
}));
