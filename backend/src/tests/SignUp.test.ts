import supertest from 'supertest';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

import app from '../server';

const request = supertest(app);
const prisma = new PrismaClient();

describe('/signup tests', () => {
	let user: User;
	const password = '12345678';

	beforeAll(async () => {
		await prisma.user.deleteMany();

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);
		user = await prisma.user.create({
			data: {
				name: 'Martin Kacenga',
				email: 'martinkacenga@gmail.com',
				passwordHash
			}
		});
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
	});

	it('POST /signup with empty name', async () => {
		await request
			.post('/signup')
			.send({ email: 'steahdshad@gmail.com', password: 'sdhqwhdqhgwd' })
			.expect(400);
	});

	it('POST /signup with empty email', async () => {
		await request
			.post('/signup')
			.send({ name: 'Stano Petrek', password: 'sdhqwhdqhgwd' })
			.expect(400);
	});

	it('POST /signup with empty password', async () => {
		await request
			.post('/signup')
			.send({ name: 'Stano Petrek', email: 'steahdshad@gmail.com' })
			.expect(400);
	});

	it('POST /signup with wrong-formatted email', async () => {
		await request
			.post('/signup')
			.send({ email: 'steahdshad', name: 'Martin K', password: 'sdhqwhdqhgwd' })
			.expect(400);
	});

	it('POST /signup with password too short', async () => {
		await request
			.post('/signup')
			.send({ email: 'steahdshad', name: 'Martin K', password: '123' })
			.expect(400);
	});

	it('POST /signup with email already in DB', async () => {
		await request
			.post('/signup')
			.send({ email: user.email, name: 'Martin K', password: '12546443' })
			.expect(400);
	});
	it('POST /signup with valid data', async () => {
		await request
			.post('/signup')
			.send({
				email: 'steamdotto@gmail.com',
				name: 'Martin K',
				password: '12546443'
			})
			.expect(201)
			.expect('Content-Type', /json/);
	});
});
