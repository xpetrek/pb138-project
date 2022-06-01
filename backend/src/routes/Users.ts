import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * /users:
 *    get:
 *      summary: Gets all users.
 *      responses:
 *        200:
 *          description: Returns Array of User objects as JSON
 *        500:
 *          description: Server error
 */
router.get('/users', async (_req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).send(users);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      summary: Gets a user.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 4
 *            required: true
 *            description: ID of the user.
 *
 *      responses:
 *        200:
 *          description: Returns User object as JSON
 *        404:
 *          description: The user with given id does not exist
 *        500:
 *          description: Server error
 */
router.get('/users/:id', async (req, res) => {
	const id = req.params.id as string;

	try {
		const userExists = await prisma.user.count({
			where: {
				id: parseInt(id)
			}
		});
		if (!userExists) {
			return res
				.status(404)
				.json({ message: `The user with id (${id}) does not exist` });
		}

		const user = await prisma.user.findUnique({
			where: {
				id: parseInt(id)
			}
		});
		res.status(200).send(user);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

export default router;
