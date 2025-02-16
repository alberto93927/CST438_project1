import { SQLiteDatabase } from "expo-sqlite";

export const initDB = async (db: SQLiteDatabase) => {
    console.log('Database Initializing');

    try {
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                g_id TEXT UNIQUE,
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                profile_pic TEXT 
            );

            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                age INTEGER,
                weight INTEGER,
                height INTEGER,
                skill_level TEXT,
                FOREIGN KEY(user_id) REFERENCES user(id)
            );

            CREATE TABLE IF NOT EXISTS exercise (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                muscle_group TEXT,
                api_id TEXT UNIQUE
            );

            CREATE TABLE IF NOT EXISTS workout_plan (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                name TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS workout_plan_exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_plan_id INTEGER,
                exercise_id INTEGER,
                day TEXT NOT NULL, 
                sets INTEGER NOT NULL,
                reps INTEGER NOT NULL,
                FOREIGN KEY(workout_plan_id) REFERENCES workout_plan(id),
                FOREIGN KEY(exercise_id) REFERENCES exercise(id)
            );
        `);
    } catch (e) {
        console.error("Database Error: ", e);
    }
}