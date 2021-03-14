interface ExerciseInitialValues {
  arr: number[];
  target: number;
}

interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const parseInput = (args: string[]): ExerciseInitialValues => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  if (args.slice(2).some(item => isNaN(Number(item)))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return {
      arr: args.slice(3).map(item => Number(item)),
      target: Number(args[2])
    };
  }
};

export const calculateExercises = (arr: number[], target: number): Result => {
  const periodLength = arr.length;
  const trainingDays = arr.reduce((a: number, c: number): number =>
    a + (c ? 1 : 0), 0);
  const totalTrainingTime = arr.reduce((a: number, c: number): number =>
    a + c, 0);
  const average = totalTrainingTime / periodLength;
  const success = average >= target;
  const rating = success ? 3 : average / target * 3;
  const ratingDescription = success
    ? 'great!'
    : rating > 1.5
      ? 'not too bad but could be better'
      : 'could be better';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  try {
    const { arr, target } = parseInput(process.argv);
    console.log(calculateExercises(arr, target));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something went wrong:', error.message);
  }
}