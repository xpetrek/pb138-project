import express from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * /signup:
 *    post:
 *      summary: Sign the user up.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *                  - email
 *                  - password
 *              properties:
 *                name:
 *                  type: string
 *                  example: Martin Kacenga
 *                email:
 *                  type: string
 *                  example: martinkacenga@gmail.com
 *                password:
 *                  type: string
 *                  example: 123456
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  userId:
 *                    description: An ID of the created user.
 *                    type: integer
 *                    example: 1
 *        400:
 *          description: Validation error
 *        500:
 *          description: Server error
 */
router.post(
	'/signup',
	body('name').notEmpty(),
	body('email').isEmail().notEmpty(),
	body('password', 'password length must be at least 8')
		.isLength({ min: 8 })
		.notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;

		try {
			const emailExists = await prisma.user.count({
				where: {
					email
				}
			});
			console.log(emailExists);
			if (emailExists) {
				return res.status(400).json({
					message: `Sign-up has failed, the account with the given email (${email}) already exists`
				});
			}

			const saltRounds = 10;
			const passwordHash = await bcrypt.hash(password, saltRounds);

			const createdUser = await prisma.user.create({
				data: {
					name,
					email,
					passwordHash
				}
			});
			res.status(201).json({ userId: createdUser.id });
		} catch (e) {
			return res.status(500).json({ message: e.message });
		}
	}
);

export default router;
