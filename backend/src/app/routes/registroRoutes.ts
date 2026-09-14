import { Router } from 'express';
import { container } from '../../infra/container/container';
import { RegistroController } from '../controllers/RegistroController';
import { registrationLimiter, excelLimiter } from '../middleware/rateLimiter';

const router = Router();
const registroController = container.resolve(RegistroController);

/**
 * @swagger
 * /api/registrations:
 *   post:
 *     summary: Create a new registration
 *     tags:
 *       - Registrations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               identificationType:
 *                 type: string
 *               identificationNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: string
 *               ageGroup:
 *                 type: string
 *               department:
 *                 type: string
 *               municipality:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *               acceptedTerms:
 *                 type: boolean
 *             required:
 *               - fullName
 *               - phone
 *               - email
 *               - identificationNumber
 *               - municipality
 *               - acceptedTerms
 *           example:
 *             fullName: Juan Carlos Rodríguez
 *             countryCode: "+57"
 *             phone: "3001234567"
 *             identificationType: CC
 *             identificationNumber: "12345678901"
 *             email: juan.rodriguez@example.com
 *             address: Calle Principal 123, Apto 4B
 *             ageGroup: "25-35"
 *             department: Casanare
 *             municipality: Yopal
 *             gender: Male
 *             acceptedTerms: true
 *     responses:
 *       201:
 *         description: Registration created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Registration created successfully
 *               id: 123456
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid token
 */
/**
 * @swagger
 * /api/registrations:
 *   get:
 *     summary: List all registrations
 *     tags:
 *       - Registrations
 *     responses:
 *       200:
 *         description: List of all registrations
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - id: "550e8400"
 *                   fullName: Juan Carlos Rodríguez
 *                   countryCode: "+57"
 *                   phone: "3001234567"
 *                   email: juan@example.com
 *                   municipality: Yopal
 *                   createdAt: "2026-09-13T23:48:00.000Z"
 *       500:
 *         description: Server error
 */
router.get(
  '/',
  (req, res) => registroController.getAllRegistrations(req, res)
);

router.post(
  '/',
  registrationLimiter,
  (req, res) => registroController.createRegistration(req, res)
);

/**
 * @swagger
 * /api/registrations/excel:
 *   get:
 *     summary: Download registrations as Excel file
 *     tags:
 *       - Registrations
 *     responses:
 *       200:
 *         description: Excel file with registrations
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Invalid token
 */
router.get(
  '/excel',
  excelLimiter,
  (req, res) => registroController.getRegistrationsExcel(req, res)
);

/**
 * @swagger
 * /api/registrations:
 *   delete:
 *     summary: Delete all registrations (development only)
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: query
 *         name: confirm
 *         schema:
 *           type: string
 *         required: true
 *         description: Must be "DELETE_ALL" to confirm
 *     responses:
 *       200:
 *         description: All registrations deleted
 *       400:
 *         description: Missing confirmation
 *       403:
 *         description: Confirmation failed
 */
router.delete(
  '/',
  (req, res) => registroController.deleteAllRegistrations(req, res)
);

export default router;
