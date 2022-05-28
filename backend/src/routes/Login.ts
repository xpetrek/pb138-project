import express from 'express';
import { body, validationResult } from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET =
	'sZ-d8!}2a;L]eKbKa+HE*qWFtDFRWsw6}_ZB2UJ7SHP]v]:UD+Sc%H\fBhws9&Bh';

/**
 * @swagger
 * /login:
 *    post:
 *      summary: Logs the user in.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  example: martinkacenga@gmail.com
 *                password:
 *                  type: string
 *                  example: 123456
 *                  minLength: 8
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI
 *                  userId:
 *                    type: integer
 *                    example: 1
 *        400:
 *          description: Validation error
 *        401:
 *          description: Authentication failed due
 *        500:
 *          description: Server error
 */
router.post(
	'/login',
	body('email', 'email has wrong format').isEmail(),
	body('password', 'password length must be at least 8').isLength({ min: 8 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;

		try {
			const user = await prisma.user.findUnique({
				where: {
					email
				}
			});

			if (user === null) {
				return res.status(401).json({
					message: `The email (${email}) your provided is already tied to an account`
				});
			}

			const passwordMatch = await bcrypt.compare(password, user.passwordHash);
			if (!passwordMatch) {
				return res.status(401).json({
					message: `The password (${password}) your provided is invalid`
				});
			}

			return res.status(200).json({
				token: jsonwebtoken.sign({ user: user.email }, JWT_SECRET),
				userId: user.id
			});
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

export default router;
