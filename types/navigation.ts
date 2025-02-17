import { Exercise } from "./exercise";

export type RootStackParamList = {
  '(tabs)': undefined;
  'ExerciseDetail': { exercise: Exercise };
  'WorkoutDay': { day: string; workout: string };
  'AccountSettings': undefined;
  'AddWorkout': { day: string; userId: string, workoutPlanName: string };
  '+not-found': undefined;
  'editWorkout': { day: string};
};

export type TabParamList = {
  home: undefined;
  explore: undefined;
};