import express from 'express';
import cors from 'cors';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import loginRoute from './routes/Login';
import signupRoute from './routes/SignUp';
import usersRoute from './routes/Users';
import roomsRoute from './routes/Rooms';
import reservationsRoute from './routes/Reservations';

const app = express();

app.use(cors({
	origin: "http://localhost:3000"
}))

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Rooms API',
			version: '1.0.0'
		}
	},
	apis: ['./src/routes/**.ts']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
app.use(loginRoute);
app.use(signupRoute);
app.use(usersRoute);
app.use(roomsRoute);
app.use(reservationsRoute);

export default app;
