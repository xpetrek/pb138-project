import express from 'express';
import loginRoute from './routes/Login';
import signupRoute from './routes/SignUp'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loginRoute);
app.use(signupRoute);

app.get('/', (req, res) => {
  res.send('Hello from A!')
})

app.listen(PORT, () => {
  console.log('Backend server is running');
});

export default app;