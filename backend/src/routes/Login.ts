import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = "sZ-d8!}2a;L]eKbKa+HE*qWFtDFRWsw6}_ZB2UJ7SHP]v]:UD+Sc%H\fBhws9&Bh";

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: userName
      }
    }
  });

  if (user === null) {
    return res
      .status(401)
      .json({ message: "The username your provided is invalid" });
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return res
      .status(401)
      .json({ message: "The password your provided is invalid" });
  }

  return res.json({
    token: jsonwebtoken.sign({ user: user.username }, JWT_SECRET),
  });
});

export default router;