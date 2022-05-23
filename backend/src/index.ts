import express from 'express';

const JWT_SECRET = "sZ-d8!}2a;L]eKbKa+HE*qWFtDFRWsw6}_ZB2UJ7SHP]v]:UD+Sc%H\fBhws9&Bh";


const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Backend is running on port ${port}.`);
});