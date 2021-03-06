import express from 'express';
import { body, query, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

import { validateToken } from '../authentication';

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @swagger
 * /reservations:
 *    get:
 *      summary: Gets all reservations. The reservations can be further filtered using query parameters.
 *      parameters:
 *          - in: query
 *            name: roomId
 *            schema:
 *              type: integer
 *              example: 4
 *          - in: query
 *            name: userId
 *            schema:
 *              type: integer
 *              example: 2
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
 *        400:
 *          description: Validation error
 *        500:
 *          description: Server error
 */
router.get(
	'/reservations',
	query('from', 'from is not a Date').optional().isDate(),
	query('to', 'to is not a Date').optional().isDate(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const roomId = req.query.roomId as string;
		const userId = req.query.userId as string;
		const from = req.query.from as string;
		const to = req.query.to as string;

		try {
			let reservations = await prisma.reservation.findMany({
				include: {
					room: {
						select: {
							pictures: true,
							name: true
						}
					}
				}
			});

			if (roomId) {
				reservations = reservations.filter(
					reservation => reservation.roomId === parseInt(roomId)
				);
			}
			if (userId) {
				reservations = reservations.filter(
					reservation => reservation.userId === parseInt(userId)
				);
			}
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
	}
);

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
 *          description: Validation error or coflicting reservation
 *        404:
 *          description: Specified room or user does not exist
 *        500:
 *          description: Server error
 */
router.post(
	'/reservations',
	body('from').isDate().notEmpty(),
	body('to').isDate().notEmpty(),
	body('roomId').notEmpty(),
	body('userId').notEmpty(),
	validateToken,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { from, to, roomId, userId } = req.body;
		if (res.locals.user.id !== userId) {
			return res.status(401).json({
				message: `The user with id ${res.locals.user.id} is not authorized to create this reservation`
			});
		}

		const fromDate = new Date(from);
		const toDate = new Date(to);
		if (fromDate > toDate) {
			return res
				.status(400)
				.json({ message: 'From cannot be greater than to' });
		}

		try {
			const room = await prisma.room.findUnique({
				where: {
					id: roomId
				}
			});

			if (!room) {
				return res
					.status(404)
					.json({ message: `The room with id (${roomId}) does not exist` });
			}

			const difference = toDate.getTime() - fromDate.getTime();
			const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
			if (totalDays <= 0) {
				return res
					.status(400)
					.json({ message: `The reservation has to be at least 1 day long!` });
			}
			const finalPrice = room.pricePerDay.mul(totalDays);

			const userExists = await prisma.user.count({
				where: {
					id: userId
				}
			});
			if (!userExists) {
				return res
					.status(404)
					.json({ message: `The user with id (${userId}) does not exist` });
			}

			const conflictingReservations = await prisma.reservation.count({
				where: {
					from: {
						lte: toDate
					},
					to: {
						gte: fromDate
					},
					roomId: {
						equals: roomId
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
					price: finalPrice,
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
	}
);

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
router.delete('/reservations/:id', validateToken, async (req, res) => {
	const id = parseInt(req.params.id as string);

	try {
		const reservation = await prisma.reservation.findUnique({
			where: {
				id
			}
		});

		if (!reservation) {
			return res
				.status(404)
				.json({ message: `The reservation with id (${id}) does not exist` });
		}

		if (res.locals.user.id !== reservation.userId) {
			return res.status(401).json({
				message: `The user with id ${res.locals.user.id} is not authorized to delete this reservation`
			});
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
