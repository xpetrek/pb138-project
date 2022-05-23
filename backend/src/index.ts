import express from 'express';
import loginRoute from './routes/Login';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/login', loginRoute);

app.listen(PORT, () => {
  console.log('Backend server is running');
});