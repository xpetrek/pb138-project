import supertest from 'supertest';
import { PrismaClient } from '@prisma/client';

import app from '../server';

const request = supertest(app);
const prisma = new PrismaClient();

describe('/users tests', () => {
	let userId: number;

	beforeAll(async () => {
		await prisma.user.deleteMany();
		const user = await prisma.user.create({
			data: {
				name: 'Martin Kacenga',
				email: 'martinkacenga@gmail.com',
				passwordHash: 'dhquwgfyqgkchsbakgdyq'
			}
		});
		userId = user.id;
	});

	afterAll(async () => {
		await prisma.user.deleteMany();
	});

	it('GET /users', async () => {
		const response = await request
			.get('/users')
			.expect(200)
			.expect('Content-Type', /json/);
		expect(response.body).toHaveLength(1);
	});

	it('GET /users/{id} with good ID', async () => {
		const response = await request
			.get(`/users/${userId}`)
			.expect(200)
			.expect('Content-Type', /json/);
		expect(response.body.id).toStrictEqual(userId);
	});

	it('GET /users/{id} with non-existent ID', async () => {
		await request
			.get(`/users/${userId + 5}`)
			.expect(404)
			.expect('Content-Type', /json/);
	});
});
