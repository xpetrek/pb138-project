import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * /rooms:
 *    get:
 *      summary: Gets rooms including their reservations and pictures. The rooms can be filtered using non-mandatory query parameters.
 *      parameters:
 *          - in: query
 *            name: ownerId
 *            schema:
 *              type: integer
 *              example: 4
 *          - in: query
 *            name: from
 *            schema:
 *              type: string
 *              example: 2022-10-08
 *            description: Date
 *          - in: query
 *            name: to
 *            schema:
 *              type: string
 *              example: 2022-10-10
 *            description: Date
 *          - in: query
 *            name: location
 *            schema:
 *              type: string
 *              example: Brno
 *      responses:
 *        200:
 *          description: Returns Array of Room objects as JSON
 *        500:
 *          description: Server error
 */
router.get('/rooms', async (req, res) => {
	const ownerId = req.query.ownerId as string;
	const from = req.query.from as string;
	const to = req.query.to as string;
	const location = req.query.location as string;

	try {
		let rooms = await prisma.room.findMany({
			include: {
				reservations: true,
				pictures: true
			}
		});
		if (ownerId) {
			rooms = rooms.filter(room => room.ownerId === parseInt(ownerId));
		}
		if (from) {
			const fromDate = new Date(from);
			rooms = rooms.filter(room =>
				room.reservations.find(reservation => reservation.from >= fromDate)
			);
		}
		if (to) {
			const toDate = new Date(to);
			rooms = rooms.filter(room =>
				room.reservations.find(reservation => reservation.to <= toDate)
			);
		}
		if (location) {
			rooms = rooms.filter(room => room.location === location);
		}
		res.status(200).send(rooms);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /rooms/{id}:
 *    get:
 *      summary: Gets a room including its pictures and reservations.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 4
 *            required: true
 *            description: ID of the room.
 *
 *      responses:
 *        200:
 *          description: Returns Room object as JSON
 *        500:
 *          description: Server error
 */
router.get('/rooms/:id', async (req, res) => {
	const id = req.params.id as string;

	try {
		const room = await prisma.room.findUnique({
			where: {
				id: parseInt(id)
			},
			include: {
				pictures: true,
				reservations: true
			}
		});
		res.status(200).send(room);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /rooms:
 *    post:
 *      summary: Creates a room.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - location
 *                  - pricePerDay
 *                  - ownerId
 *              properties:
 *                name:
 *                  type: string
 *                  example: 2-room flat
 *                description:
 *                  type: string
 *                  example: Beautiful flat not far from the center of Brno.
 *                location:
 *                  type: string
 *                  example: Brno
 *                pricePerDay:
 *                  type: integer
 *                  example: 250
 *                ownerId:
 *                  type: integer
 *                  example: 1
 *                pictures:
 *                  type: array
 *                  required:
 *                      - url
 *                      - label
 *                  items:
 *                      type: object
 *                      properties:
 *                          url:
 *                              type: string
 *                              example: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fliving-room&psig=AOvVaw1qHpyfpxlUIhtmq5PsOjri&ust=1653847473632000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPDGsYvkgvgCFQAAAAAdAAAAABAD
 *                          label:
 *                              type: string
 *                              example: Picture of the room
 *
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  roomId:
 *                    description: An ID of the created room.
 *                    type: integer
 *                    example: 1
 *        500:
 *          description: Server error
 */
router.post('/rooms', async (req, res) => {
	const { name, description, location, pricePerDay, ownerId, pictures } =
		req.body;

	try {
		const createdRoom = await prisma.room.create({
			data: {
				name,
				description,
				location,
				pricePerDay,
				ownerId,
				pictures: {
					create: pictures
				}
			}
		});
		res.status(201).json({ roomId: createdRoom.id });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /rooms/{id}:
 *    delete:
 *      summary: Deletes a room including its pictures.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 5
 *            required: true
 *            description: ID of the room that should be deleted.
 *
 *      responses:
 *        200:
 *          description: Deleted
 *        404:
 *          description: The room with given id does not exist
 *        500:
 *          description: Server error
 */
router.delete('/rooms/:id', async (req, res) => {
	const id = parseInt(req.params.id as string);

	try {
		const roomExists = await prisma.room.count({
			where: {
				id
			}
		});
		if (!roomExists) {
			return res
				.status(404)
				.json({ message: `The room with id (${id}) does not exist` });
		}

		const deletePictures = prisma.picture.deleteMany({
			where: {
				roomId: id
			}
		});
		const deleteRoom = prisma.room.delete({
			where: {
				id
			}
		});
		await prisma.$transaction([deletePictures, deleteRoom]);
		res.status(200).json({ message: 'Successfully deleted a room' });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

export default router;
