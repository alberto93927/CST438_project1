import { Exercise } from "./exercise";

export type RootStackParamList = {
  '(tabs)': undefined;
  'ExerciseDetail': { exercise: Exercise };
  'WorkoutDay': { day: string; workout: string };
  'AccountSettings': undefined;
  'AddWorkout': undefined;
  '+not-found': undefined;
  'EditWorkout': undefined;
};

export type TabParamList = {
  home: undefined;
  explore: undefined;
};