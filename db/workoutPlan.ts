import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

//Function to initialize and get the database
const getDatabase = async () => {
    if (!db) {
        db = await SQLite.openDatabaseAsync("flexzone_database");
        console.log(" Database initialized!");
    }
    return db;
};

export const addExerciseToWorkoutPlan = async (
    userId: string,
    workoutPlanName: string,
    exerciseName: string,
    day: string,
    sets: number,
    reps: number
) => {
    console.log("Inside addExerciseToWorkoutPlan function");

    try {
        const db = await getDatabase(); // Getting database instance

        type Exercise = { id: number };
        type WorkoutPlan = { id: number };

        let exerciseId: number | null = null;
        let workoutPlanId: number | null = null;

        // Check if exercise exists
        const existingExercise = (await db.getFirstAsync("SELECT id FROM exercise WHERE name = ?", [exerciseName])) as Exercise | undefined;
        if (existingExercise) {
            exerciseId = existingExercise.id;
            console.log(`Found Exercise ID: ${exerciseId}`);
        } else {
            console.log(`Inserting new exercise: ${exerciseName}`);
            const result = await db.runAsync("INSERT INTO exercise (name) VALUES (?)", exerciseName);
            exerciseId = result?.lastInsertRowId || null;
            console.log(`New Exercise ID: ${exerciseId}`);
        }

        if (!exerciseId) {
            console.error("Failed to retrieve exercise ID");
            return false;
        }

        // Check if workout plan exists
        const existingPlan = (await db.getFirstAsync("SELECT id FROM workout_plan WHERE user_id = ? AND name = ?", [userId, workoutPlanName])) as WorkoutPlan | undefined;
        if (existingPlan) {
            workoutPlanId = existingPlan.id;
            console.log(`Found Workout Plan ID: ${workoutPlanId}`);
        } else {
            console.log(`🆕 Inserting new workout plan: ${workoutPlanName}`);
            const result = await db.runAsync("INSERT INTO workout_plan (user_id, name) VALUES (?, ?)", userId, workoutPlanName);
            workoutPlanId = result?.lastInsertRowId || null;
            console.log(`New Workout Plan ID: ${workoutPlanId}`);
        }

        if (!workoutPlanId) {
            console.error("Failed to retrieve workout plan ID");
            return false;
        }

        // Insert into `workout_plan_exercises`
        console.log("Inserting exercise into workout_plan_exercises...");
        await db.runAsync(
            "INSERT INTO workout_plan_exercises (workout_plan_id, exercise_id, day, sets, reps) VALUES (?, ?, ?, ?, ?)",
            workoutPlanId, exerciseId, day, sets, reps
        );

        console.log("Exercise successfully added to workout plan!");
        return true;
    } catch (error) {
        console.error("SQL Error:", error);
        return false;
    }
};

//need type for sennding data to WorkoutDay.tsx
export type WorkoutExercise = {
    name: string;
    sets: number;
    reps: number;
};

export const fetchWorkoutExercises = async (day: string): Promise<WorkoutExercise[]> => {
    const db = await getDatabase();

    try {

        const result = (await db.getAllAsync(
            `SELECT e.name, we.sets, we.reps 
         FROM workout_plan_exercises we 
         JOIN exercise e ON we.exercise_id = e.id 
         WHERE we.day = ?`,
            [day]
        )) as WorkoutExercise[];

        return result;
    } catch (error) {
        return [];
    }
};
