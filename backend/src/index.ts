import express from 'express';
import loginRoute from './routes/Login';
import signupRoute from './routes/SignUp';
import usersRoute from './routes/Users';
import roomsRoute from './routes/Rooms';
import reservationsRoute from './routes/Reservations';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loginRoute);
app.use(signupRoute);
app.use(usersRoute);
app.use(roomsRoute);
app.use(reservationsRoute);

app.listen(PORT, () => {
  console.log('Backend server is running');
});

export default app;