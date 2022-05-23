import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();
const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log(passwordHash);


    const createdUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            passwordHash: passwordHash,
        }
    });

    console.log(createdUser);

    if (createdUser === null) {
        return res
          .status(401)
          .json({ message: "The sign-up has failed!" });
    }
    res.status(200).send("Successfully created an user!");
});

export default router;