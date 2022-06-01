import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../server';

const request = supertest(app);
const prisma = new PrismaClient();

describe('/reservations tests', () => {
	let userId: number;
	let roomId: number;
	let reservationId: number;

	beforeAll(async () => {
		await prisma.user.deleteMany();
		await prisma.room.deleteMany();
		await prisma.reservation.deleteMany();

		const user = await prisma.user.create({
			data: {
				name: 'Martin Kacenga',
				email: 'martinkacenga@gmail.com',
				passwordHash: 'dhquwgfyqgkchsbakgdyq'
			}
		});
		userId = user.id;

		const room = await prisma.room.create({
			data: {
				name: '2-room flat',
				description: 'Beautiful flat not far from the center of Brno.',
				location: 'Brno',
				pricePerDay: 250,
				ownerId: user.id
			}
		});
		roomId = room.id;

		const reservation = await prisma.reservation.create({
			data: {
				from: new Date('2020-09-10'),
				to: new Date('2020-09-10'),
				roomId: room.id,
				userId: user.id
			}
		});
		reservationId = reservation.id;
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.room.deleteMany();
		await prisma.reservation.deleteMany();
	});

	it('GET /reservations get all reservations without query params', async () => {
		await request.get('/reservations').expect(400);
	});

	it('GET /reservations from is not a Date string', async () => {
		await request
			.get('/reservations')
			.query({ roomId, from: 'shdhjqe' })
			.expect(400);
	});

	it('GET /reservations to is not a Date string', async () => {
		await request
			.get('/reservations')
			.query({ roomId, from: 'shdhjqe' })
			.expect(400);
	});

	it('GET /reservations valid query', async () => {
		const response = await request
			.get('/reservations')
			.query({ roomId, from: '2020-09-10', to: '2020-09-10' })
			.expect(200);
		expect(response.body).toHaveLength(1);
	});

	it('GET /reservations/{id} with good ID', async () => {
		const response = await request
			.get(`/reservations/${reservationId}`)
			.expect(200)
			.expect('Content-Type', /json/);
		expect(response.body.id).toStrictEqual(reservationId);
	});

	it('GET /reservations/{id} with non-existent ID', async () => {
		await request
			.get(`/reservations/${reservationId + 5}`)
			.expect(404)
			.expect('Content-Type', /json/);
	});

	it('POST /reservations with empty from', async () => {
		await request
			.post('/reservations')
			.send({
				to: '2022-05-08',
				roomId,
				userId
			})
			.expect(400);
	});

	it('POST /reservations with empty to', async () => {
		await request
			.post('/reservations')
			.send({
				from: '2022-05-08',
				roomId,
				userId
			})
			.expect(400);
	});

	it('POST /reservations with empty roomId', async () => {
		await request
			.post('/reservations')
			.send({
				to: '2022-04-08',
				from: '2022-05-08',
				userId
			})
			.expect(400);
	});

	it('POST /reservations with empty userId', async () => {
		await request
			.post('/reservations')
			.send({
				to: '2022-04-08',
				from: '2022-05-08',
				roomId
			})
			.expect(400);
	});

	it('POST /reservations with from > to', async () => {
		await request
			.post('/reservations')
			.send({
				from: '2022-05-08',
				to: '2022-04-08',
				roomId,
				userId
			})
			.expect(400);
	});

	it('POST /reservations create valid reservation', async () => {
		await request
			.post('/reservations')
			.send({
				from: '2022-04-08',
				to: '2022-05-08',
				roomId,
				userId
			})
			.expect(201);
	});

	it('DELETE /reservations/{id} with good ID', async () => {
		await request.get(`/reservations/${reservationId}`).expect(200);
	});

	it('DELETE /reservations/{id} with non-existent ID', async () => {
		await request.get(`/reservations/${reservationId + 5}`).expect(404);
	});
});
