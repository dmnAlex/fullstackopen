import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({
      error: 'malformated parameters'
    });
  } else {
    res.json({
      height,
      weight,
      bmi: calculateBmi(height, weight)
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({
      error: 'parameters missing'
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!Array.isArray(daily_exercises) || isNaN(target) || daily_exercises.some(item => isNaN(item))) {
    res.status(400).json({
      error: 'malformated parameters'
    });
  }

  res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});