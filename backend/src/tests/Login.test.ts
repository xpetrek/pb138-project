import supertest from 'supertest';
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

import app from '../server';

const request = supertest(app);
const prisma = new PrismaClient();

describe('/login tests', () => {
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

	it('POST /login with wrong-formatted email', async () => {
		await request
			.post('/login')
			.send({ email: 'steahdshad', password: 'sdhqwhdqhgwd' })
			.expect(400);
	});

	it('POST /login with empty email', async () => {
		await request.post('/login').send({ password }).expect(400);
	});

	it('POST /login with empty password', async () => {
		await request
			.post('/login')
			.send({ email: 'steahdshad@gmail.com' })
			.expect(400);
	});

	it('POST /login with password too short', async () => {
		await request
			.post('/login')
			.send({ email: 'steahdshad@gmail.com', password: '1234' })
			.expect(400);
	});

	it('POST /login with incorrect email', async () => {
		await request
			.post('/login')
			.send({ email: 'steahdshad@gmail.com', password: '1236646544' })
			.expect(401);
	});

	it('POST /login with incorrect password but existing email', async () => {
		await request
			.post('/login')
			.send({ email: user.email, password: '4849848494' })
			.expect(401);
	});

	it('POST /login with correct credentials', async () => {
		await request
			.post('/login')
			.send({ email: user.email, password })
			.expect(200);
	});
});
