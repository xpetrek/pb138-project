import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const createdUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHash: passwordHash,
        }
    });


    if (createdUser === null) {
        return res
          .status(401)
          .json({ message: "The sign-up has failed!" });
    }
    return res.status(200);
});

export default router;