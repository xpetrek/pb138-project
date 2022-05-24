import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const router = express.Router();

router.get("/reservations", async (req, res) => {
    const roomId = req.query.roomId as string;

    if (!roomId) {
        return res.status(400).json({ message: "Missing roomId!" })
    }

    const from = req.query.from as string;
    const to = req.query.to as string;

    let reservations = await prisma.reservation.findMany({
        where: {
            roomId: parseInt(roomId),
        }
    });

    if (from) {
        const fromDate = new Date(from);
        reservations = reservations.filter(reservation => reservation.from >= fromDate);
    }
    if (to) {
        const toDate = new Date(to);
        reservations = reservations.filter(reservation => reservation.to <= toDate);
    }


    res.status(200).send(reservations);
});

router.get("/reservations/:id", async (req, res) => {
    const id = req.params.id as string;
    const reservation = await prisma.reservation.findUnique({
        where: {
            id: parseInt(id),
        }
    })
    res.status(200).send(reservation);
});

router.post("/reservations", async (req, res) => {
    const { from, to, roomId, userId } = req.body;

    const createdReservation = await prisma.reservation.create({
        data: {
            from: new Date(from),
            to: new Date(to),
            room: {
                connect: {
                    id: roomId,
                }
            },
            user: {
                connect: {
                    id: userId,
                }
            }
        }
    });

    if (createdReservation === null) {
        return res
          .status(400)
          .json({ message: "The creation of a reservation has failed!" });
    }
    res.status(201).json({ id: createdReservation.id })
});

router.delete("/reservations/:id", async (req, res) => {
    const id = parseInt(req.params.id as string);

    await prisma.reservation.delete({
        where: {
            id: id,
        }
    });

    res.status(200).json({ message: "Successfully deleted a reservation!" });
});

router.put("/reservations/:id", async (req, res) => {
    const id = parseInt(req.params.id as string);

    const updatedReservation = await prisma.reservation.update({
        where: {
            id: id,
        },
        data: req.body
    })


    res.status(201).json({ id: updatedReservation.id });
});

export default router;