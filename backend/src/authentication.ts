import { User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';

export const generateAccessToken = (user: Partial<User>) =>
	jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m'
	});

export const validateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader.split(' ')[1];
	if (token === null) {
		res.sendStatus(400).send('Token not present');
	}
	jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			res.status(403).send('Token invalid');
		} else {
			res.locals.user = user;
			next();
		}
	});
};
