import express from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const router = express.Router();

router.get("/rooms", async (req, res) => {
    const ownerId = req.query.ownerId as string;
    const from = req.query.from as string;
    const to = req.query.to as string;
    const location = req.query.location as string;

    let rooms = await prisma.room.findMany({
        include: {
            reservations: {
                select: {
                    from: true,
                    to: true,
                }
            }
        }
    });

    if (ownerId) {
        rooms = rooms.filter(room => room.ownerId === parseInt(ownerId));
    }
    if (from) {
        const fromDate = new Date(from);
        rooms = rooms.filter(room => room.reservations.find(reservation => reservation.from >= fromDate));
    }
    if (to) {
        const toDate = new Date(to);
        rooms = rooms.filter(room => room.reservations.find(reservation => reservation.to <= toDate));
    }
    if (location) {
        rooms = rooms.filter(room => room.location === location);
    }    
    res.status(200).send(rooms);
});

router.get("/rooms/:id", async (req, res) => {
    const id = req.params.id as string;
    const room = await prisma.room.findUnique({
        where: {
            id: parseInt(id),
        }
    })
    res.status(200).send(room);
});

router.post("/rooms", async (req, res) => {
    const { name, description, location, pricePerDay, ownerId, pictures } = req.body;

    const createdRoom = await prisma.room.create({
        data: {
            name: name,
            description: description,
            location: location,
            pricePerDay: pricePerDay,
            ownerId: ownerId,
            pictures: {
                create: pictures
            }
        }
    });

    if (createdRoom === null) {
        return res
          .status(400)
          .json({ message: "The creation of a room has failed!" });
    }
    res.status(201).json({ id: createdRoom.id });
});


router.delete("/rooms/:id", async (req, res) => {
    const id = parseInt(req.params.id as string);

    const deletePictures = prisma.picture.deleteMany({
        where: {
            roomId: id
        }
    });

    const deleteRoom = prisma.room.delete({
        where: {
            id: id,
        }
    });

    await prisma.$transaction([deletePictures, deleteRoom])


    res.status(200).json({ message: "Successfully deleted a room!" });
});

router.put("/rooms/:id", async (req, res) => {
    const id = parseInt(req.params.id as string);

    const updatedRoom = await prisma.room.update({
        where: {
            id: id,
        },
        data: req.body
    })


    res.status(200).json({ id: updatedRoom.id });
});

export default router;