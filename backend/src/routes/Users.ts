import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const router = express.Router();

router.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).send(users);

});

router.get("/users/:id", async (req, res) => {
    const id = req.params.id as string;
    console.log(id);
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(id),
        }
    })
    res.status(200).send(user);
});

export default router;