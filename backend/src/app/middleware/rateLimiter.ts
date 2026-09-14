import rateLimit from 'express-rate-limit';

export const registrationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many registrations from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const excelLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: 'Too many Excel exports from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
