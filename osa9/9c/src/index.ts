import express from 'express';
import patientRouter from "./routes/patients";
import diagnosisRouter from "./routes/diagnoses";
const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});