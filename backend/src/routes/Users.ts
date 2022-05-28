import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/users', async (_req, res) => {
	try {
		const users = await prisma.user.findMany();
		res.status(200).send(users);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

router.get('/users/:id', async (req, res) => {
	const id = req.params.id as string;

	try {
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
