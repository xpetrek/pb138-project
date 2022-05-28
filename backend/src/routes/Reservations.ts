import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * /reservations:
 *    get:
 *      summary: Gets all reservations for given roomId. The reservations can be further filtered using query parameters.
 *      parameters:
 *          - in: query
 *            name: roomId
 *            schema:
 *              type: integer
 *              example: 4
 *            required: true
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
 *      responses:
 *        200:
 *          description: Returns Array of Reservation objects as JSON
 *        404:
 *          description: Missing room ID
 *        500:
 *          description: Server error
 */
router.get('/reservations', async (req, res) => {
	const roomId = req.query.roomId as string;

	if (!roomId) {
		return res.status(404).json({ message: 'Missing roomId' });
	}

	const from = req.query.from as string;
	const to = req.query.to as string;

	try {
		let reservations = await prisma.reservation.findMany({
			where: {
				roomId: parseInt(roomId)
			}
		});

		if (from) {
			const fromDate = new Date(from);
			reservations = reservations.filter(
				reservation => reservation.from >= fromDate
			);
		}
		if (to) {
			const toDate = new Date(to);
			reservations = reservations.filter(
				reservation => reservation.to <= toDate
			);
		}
		res.status(200).send(reservations);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /reservations/{id}:
 *    get:
 *      summary: Gets a reservation.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 4
 *            required: true
 *            description: ID of reservation.
 *
 *      responses:
 *        200:
 *          description: Returns Reservation object as JSON
 *        500:
 *          description: Server error
 */
router.get('/reservations/:id', async (req, res) => {
	const id = req.params.id as string;

	try {
		const reservationExists = await prisma.reservation.count({
			where: {
				id: parseInt(id)
			}
		});
		if (!reservationExists) {
			return res
				.status(404)
				.json({ message: `The reservation with id (${id}) does not exist` });
		}

		const reservation = await prisma.reservation.findUnique({
			where: {
				id: parseInt(id)
			}
		});
		res.status(200).send(reservation);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /reservations:
 *    post:
 *      summary: Creates a reservation (if there are no conflicts)
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                  - from
 *                  - to
 *                  - roomId
 *                  - ownerId
 *              properties:
 *                from:
 *                  type: string
 *                  example: 2022-10-08
 *                  description: Date
 *                to:
 *                  type: string
 *                  example: 2022-10-10
 *                  description: Date
 *                roomId:
 *                  type: integer
 *                  example: 1
 *                userId:
 *                  type: integer
 *                  example: 1
 *
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  reservationId:
 *                    description: An ID of the created reservation.
 *                    type: integer
 *                    example: 1
 *        400:
 *          description: There is a conflicting reservation
 *        500:
 *          description: Server error
 */
router.post('/reservations', async (req, res) => {
	const { from, to, roomId, userId } = req.body;
	const fromDate = new Date(from);
	const toDate = new Date(to);

	try {
		const conflictingReservations = await prisma.reservation.count({
			where: {
				from: {
					lte: toDate
				},
				to: {
					gte: fromDate
				}
			}
		});

		if (conflictingReservations) {
			return res.status(400).json({
				message: 'There is already a reservation in the chosen time frame'
			});
		}

		const createdReservation = await prisma.reservation.create({
			data: {
				from: fromDate,
				to: toDate,
				room: {
					connect: {
						id: roomId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		});
		res.status(201).json({ reservationId: createdReservation.id });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

/**
 * @swagger
 * /reservations/{id}:
 *    delete:
 *      summary: Deletes a reservation.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              example: 5
 *            required: true
 *            description: ID of the reservation that should be deleted.
 *
 *      responses:
 *        200:
 *          description: Deleted
 *        404:
 *          description: The reservation with given id does not exist
 *        500:
 *          description: Server error
 */
router.delete('/reservations/:id', async (req, res) => {
	const id = parseInt(req.params.id as string);

	try {
		const reservationExists = await prisma.reservation.count({
			where: {
				id
			}
		});
		if (!reservationExists) {
			return res
				.status(404)
				.json({ message: `The reservation with id (${id}) does not exist` });
		}

		await prisma.reservation.delete({
			where: {
				id
			}
		});

		res.status(200).json({ message: 'Successfully deleted a reservation' });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
});

export default router;
