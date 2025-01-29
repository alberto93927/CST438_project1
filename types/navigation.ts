import { Exercise } from "./exercise";

export type RootStackParamList = {
    '(tabs)': undefined;
    'ExerciseDetail': { exercise: Exercise };
    '+not-found': undefined;
  };