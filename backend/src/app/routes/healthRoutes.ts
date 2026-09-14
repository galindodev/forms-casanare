import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: Server is running
 */
router.get('/', (_req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

export default router;
