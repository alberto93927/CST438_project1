import * as SQLite from 'expo-sqlite';
import { StyleSheet, Platform, View, Text, Button } from 'react-native';

export const initDB = async () => {
    console.log("Reinitializing database...");

    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");

        // Drop old tables if they exist
        // Uncomment and use when updating the Schema of the database
        // All the records will be lost

        // await db.execAsync(`
        //     DROP TABLE IF EXISTS users;
        //     DROP TABLE IF EXISTS exercises;
        //     DROP TABLE IF EXISTS workout_plans;
        //     DROP TABLE IF EXISTS workout_exercises;
        // `);

        // When you start fresh, you have to initialize the database
        // Uncomment the following lines in startup
        // Once the database is initialized, you can comment it out to check for persistance
        // I will create better logic for this
        // There has to 

        // Create new tables
        // await db.execAsync(`
        //     CREATE TABLE users (
        //         id TEXT PRIMARY KEY,
        //         username TEXT UNIQUE,
        //         email TEXT UNIQUE,
        //         profile_pic TEXT
        //     );

        //     CREATE TABLE exercises (
        //         id INTEGER PRIMARY KEY AUTOINCREMENT,
        //         name TEXT NOT NULL,
        //         description TEXT,
        //         muscle_group TEXT,
        //         api_id TEXT UNIQUE
        //     );

        //     CREATE TABLE workout_plans (
        //         id INTEGER PRIMARY KEY AUTOINCREMENT,
        //         user_id TEXT,
        //         name TEXT NOT NULL,
        //         FOREIGN KEY(user_id) REFERENCES users(id)
        //     );

        //     CREATE TABLE workout_exercises (
        //         id INTEGER PRIMARY KEY AUTOINCREMENT,
        //         workout_id INTEGER,
        //         exercise_id INTEGER,
        //         FOREIGN KEY(workout_id) REFERENCES workout_plans(id) ON DELETE CASCADE,
        //         FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
        //     );
        // `);

        console.log("Database reset and reinitialized successfully!");

    } catch (e) {
        console.error("Error resetting database: ", e);
    }
};

//user table functions

export const insertUser = async (
    id: string,
    username: string,
    email: string,
    profilePic: string
) => {
    console.log("Inserting user into database...");

    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");

        await db.runAsync(
            `INSERT OR REPLACE INTO users (id, username, email, profile_pic) VALUES (?, ?, ?, ?);`,
            [id, username, email, profilePic]
        );

    } catch (e) {
        console.error("error: ", e);
    }
};



type User = {
    id: string;
    username: string;
    email: string;
};


export const selectUser = async (id: string, callback: (user: any) => void) => {
    console.log("Fetching user from database...");

    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");

        const user = (await db.getFirstAsync("SELECT * FROM users WHERE id = ?", [id])) as User;

        if (user) {
            console.log(`ID: ${user.id}, Name: ${user.username}, Email: ${user.email}`);
            callback(user);
        } else {
            console.log("User not found in database.");
            callback(null);
        }
    } catch (e) {
        console.error("Database error:", e);
        callback(null);
    }
};



const updateUser = async () => {
    console.log('Updating user from database...');
    
        try{

            const db = await SQLite.openDatabaseAsync('flexzone_database');

            // `runAsync()` is useful when you want to execute some write operations.
            await db.runAsync('UPDATE users SET username = ? WHERE id = ?', ['foo', 2]); // Binding unnamed parameters from array

        }catch (e){
            console.error("error: ", e);
        }

}

const deleteUser = async () => {
    console.log('Deleting user from database...');
    
        try{

            const db = await SQLite.openDatabaseAsync('flexzone_database');

            // `runAsync()` is useful when you want to execute some write operations.
            await db.runAsync('DELETE FROM users WHERE id = $id', { $id: 2 });

        }catch (e){
            console.error("error: ", e);
        }

}

//workout_plans table functions
export const insertWorkoutPlan = async (user_id: string, name: string) => {
    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");
        await db.runAsync(
            `INSERT INTO workout_plans (user_id, name) VALUES (?, ?);`,
            [user_id, name]
        );
    } catch (e) {
        console.error("Error inserting workout plan:", e);
    }
};

export const fetchWorkoutPlans = async (user_id: string, callback: (plans: any[]) => void) => {
    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");
        const plans = await db.getAllAsync(
            "SELECT * FROM workout_plans WHERE user_id = ?",
            [user_id]
        );
        callback(plans);
    } catch (e) {
        console.error("Error fetching workout plans:", e);
        callback([]);
    }
};

export const deleteWorkoutPlan = async (id: number) => {
    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");
        await db.runAsync("DELETE FROM workout_plans WHERE id = ?", [id]);
    } catch (e) {
        console.error("Error deleting workout plan:", e);
    }
};


export const insertExerciseAndLinkToWorkout = async (workout_id: number, exercise_name: string) => {
    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");

        // Insert the exercise into the database
        await db.runAsync(
            `INSERT INTO exercises (name, description, muscle_group) VALUES (?, ?, ?);`,
            [exercise_name, "Custom exercise", "General"]
        );

        const result = await db.getFirstAsync<{ id: number }>("SELECT last_insert_rowid() as id;");
        
        if (!result || !result.id) {
            console.error("Error: Exercise ID not retrieved properly");
            return;
        }

        const exercise_id = result.id;

        // Insert into the workout_exercises table
        await db.runAsync(
            `INSERT INTO workout_exercises (workout_id, exercise_id) VALUES (?, ?);`,
            [workout_id, exercise_id]
        );

        console.log(`Exercise '${exercise_name}' added with ID ${exercise_id} to workout ${workout_id}`);
    } catch (e) {
        console.error("Error inserting exercise into workout:", e);
    }
};



export const fetchExercisesForWorkout = async (workout_id: number, callback: (exercises: any[]) => void) => {
    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");
        const exercises = await db.getAllAsync(
            `SELECT e.id, e.name, e.description, e.muscle_group 
            FROM exercises e
            JOIN workout_exercises we ON e.id = we.exercise_id
            WHERE we.workout_id = ?`,
            [workout_id]
        );
        callback(exercises);
    } catch (e) {
        console.error("Error fetching exercises for workout:", e);
        callback([]);
    }
};

// Commented this section out instead of deleting it all together because 
// it can serve as a skeleton for an admin screen if we chose to integrate one


// export default function TabThreeScreen() {
//     return(
//         <View style={styles.container}>
//             <Text>db-service station</Text>
//             <View
//                 style={styles.btn}>
//                 <Button
//                 title="Database Initialization"
//                 onPress={() => initDB()}
//                 />
//             </View>
//             <View
//                 style={styles.btn}>
//                 <Button
//                 title="Insert User"
//                 onPress={() => insertUser()}
//                 />
//             </View>
//             <View
//                 style={styles.btn}>
//                 <Button
//                 title="Select Users"
//                 onPress={() => selectUser()}
//                 />
//             </View>
//             <View
//                 style={styles.btn}>
//                 <Button
//                 title="Update User"
//                 onPress={() => updateUser()}
//                 />
//             </View>
//             <View
//                 style={styles.btn}>
//                 <Button
//                 title="Delete Users"
//                 onPress={() => deleteUser()}
//                 />
//             </View>
//         </View>

//     );

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     btn:{
//         width: '90%',
//         height: 50
//     }

// });

