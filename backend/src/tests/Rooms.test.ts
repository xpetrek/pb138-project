import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../server';

const request = supertest(app);
const prisma = new PrismaClient();

describe('/rooms tests', () => {
	let userId: number;
	let roomId: number;
	let accessToken: string;

	beforeAll(async () => {
		await prisma.user.deleteMany();
		await prisma.room.deleteMany();
		await prisma.reservation.deleteMany();

		await request.post('/signup').send({
			name: 'Martin Kacenga',
			email: 'martinkacenga@gmail.com',
			password: '12345678'
		});

		const response = await request.post('/login').send({
			email: 'martinkacenga@gmail.com',
			password: '12345678'
		});
		accessToken = response.body.accessToken;
		userId = response.body.user.id;

		const room = await prisma.room.create({
			data: {
				name: '2-room flat',
				description: 'Beautiful flat not far from the center of Brno.',
				location: 'Brno',
				pricePerDay: 250,
				ownerId: userId
			}
		});
		roomId = room.id;

		await prisma.reservation.create({
			data: {
				from: new Date('2020-09-09'),
				to: new Date('2020-09-10'),
				price: room.pricePerDay.mul(1),
				roomId: room.id,
				userId
			}
		});
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
		await prisma.room.deleteMany();
		await prisma.reservation.deleteMany();
	});

	it('GET /rooms get all rooms without query params', async () => {
		const response = await request
			.get('/rooms')
			.expect(200)
			.expect('Content-Type', /json/);
		expect(response.body).toHaveLength(1);
	});

	it('GET /rooms from is not a Date string', async () => {
		await request.get('/rooms').query({ from: 'ksdksd' }).expect(400);
	});

	it('GET /rooms to is not a Date string', async () => {
		await request.get('/rooms').query({ to: 'ksdksd' }).expect(400);
	});

	it('GET /rooms get rooms with every query param filled', async () => {
		const response = await request
			.get('/rooms')
			.query({
				from: '2020-09-09',
				to: '2020-09-11',
				location: 'Brno',
				ownerId: userId
			})
			.expect(200)
			.expect('Content-Type', /json/);
		expect(response.body).toHaveLength(1);
	});

	it('GET /rooms/{id} with good ID', async () => {
		const response = await request
			.get(`/rooms/${roomId}`)
			.expect(200)
			.expect('Content-Type', /json/);
		expect(response.body.id).toStrictEqual(roomId);
	});

	it('GET /rooms/{id} with non-existent ID', async () => {
		await request
			.get(`/rooms/${roomId + 5}`)
			.expect(404)
			.expect('Content-Type', /json/);
	});

	it('POST /rooms with empty name', async () => {
		await request
			.post('/rooms')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				description: 'Beautiful',
				location: 'Brno',
				pricePerDay: 250,
				ownerId: userId
			})
			.expect(400);
	});

	it('POST /rooms with empty description', async () => {
		await request
			.post('/rooms')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				name: 'Big room',
				location: 'Brno',
				pricePerDay: 250,
				ownerId: userId
			})
			.expect(400);
	});

	it('POST /rooms with empty location', async () => {
		await request
			.post('/rooms')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				name: 'Big room',
				description: 'Beautiful',
				pricePerDay: 250,
				ownerId: userId
			})
			.expect(400);
	});

	it('POST /rooms with empty pricePerDay', async () => {
		await request
			.post('/rooms')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				name: 'Big room',
				description: 'Beautiful',
				location: 'Brno',
				ownerId: userId
			})
			.expect(400);
	});

	it('POST /rooms with empty ownerId', async () => {
		await request
			.post('/rooms')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				name: 'Big room',
				description: 'Beautiful',
				location: 'Brno',
				pricePerDay: 250
			})
			.expect(400);
	});

	it('POST /rooms create valid room', async () => {
		await request
			.post('/rooms')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				name: 'Big room',
				description: 'Beautiful',
				location: 'Brno',
				pricePerDay: 250,
				ownerId: userId
			})
			.expect(201);
	});

	it('DELETE /rooms/{id} with good ID', async () => {
		await request
			.delete(`/rooms/${roomId}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200);
	});

	it('DELETE /rooms/{id} with non-existent ID', async () => {
		await request
			.delete(`/rooms/${roomId + 5}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(404);
	});
});
