import { Exercise } from "./exercise";

export type RootStackParamList = {
  '(tabs)': undefined;
  'ExerciseDetail': { exercise: Exercise };
  'WorkoutDay': { day: string; workout: string };
  'AccountSettings': undefined;
  '+not-found': undefined;
};
