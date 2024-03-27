import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send("Hello Fullstack!");
});

app.get('/bmi', (req, res) => {
  console.log("search params ",req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(weight) || isNaN(height)) {
    res.status(400).send({"error":"malformatted parameters"});
    return;
  }
  const message = calculateBmi(height, weight);
  res.send({weight: weight, height:height, bmi:message});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {exercise_list, target} = req.body;
  let error: string = "";
  let p_e_l: number[] = [];
  if (!exercise_list || !target) {
    error = "parameters missing";
  }
  if (exercise_list instanceof Array) {
    p_e_l = exercise_list.map(Number);
    if (p_e_l.includes(NaN)) {
      error = "malformatted parameters";
    }
  } else {
    error = "malformatted parameters";
  }
  const numtarget = Number(target);
  if (isNaN(numtarget)) {
    error = "malformatted parameters";
  }

  if (error.length > 0) {
    res.status(400).send({"error":error});
  } else {
    const e = calculateExercises(p_e_l, numtarget);
    res.send({
      "periodLength": e.days,
      "trainingDays": e.trainingDays,
      "success": e.targetAchieved,
      "rating": e.rating,
      "ratingDescription": e.ratingText,
      "target": e.dailyTarget,
      "average": e.avgTime
  });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
