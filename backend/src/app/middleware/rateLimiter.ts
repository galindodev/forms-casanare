import rateLimit from 'express-rate-limit';

export const registrationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
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

export const referralStatsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Demasiadas consultas desde esta IP, intenta más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
