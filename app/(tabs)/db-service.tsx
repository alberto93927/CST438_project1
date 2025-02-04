import * as SQLite from 'expo-sqlite';
import { StyleSheet, Platform, View, Text, Button } from 'react-native';

const initDB = async () => {
    console.log("Reinitializing database...");

    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");

        // Drop old tables if they exist
        await db.execAsync(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS exercises;
            DROP TABLE IF EXISTS workout_plans;
        `);

        // Create new tables with updated schema
        await db.execAsync(`
            CREATE TABLE users (
                id TEXT PRIMARY KEY,  -- Now using TEXT for Google UID
                username TEXT UNIQUE,
                email TEXT UNIQUE,
                profile_pic TEXT
            );

            CREATE TABLE exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                muscle_group TEXT,
                api_id TEXT UNIQUE
            );

            CREATE TABLE workout_plans (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,  -- Updated to match Google UID
                name TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
        `);

        console.log("Database reset and reinitialized successfully!");

    } catch (e) {
        console.error("Error resetting database: ", e);
    }
};


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
            await db.runAsync('DELETE FROM users WHERE id = $id', { $id: 2 }); // Binding named parameters from object

        }catch (e){
            console.error("error: ", e);
        }

}

export default function TabThreeScreen() {
    return(
        <View style={styles.container}>
            <Text>db-service station</Text>
            <View
                style={styles.btn}>
                <Button
                title="Database Initialization"
                onPress={() => initDB()}
                />
            </View>
            {/* <View
                style={styles.btn}>
                <Button
                title="Insert User"
                onPress={() => insertUser()}
                />
            </View>
            <View
                style={styles.btn}>
                <Button
                title="Select Users"
                onPress={() => selectUser()}
                />
            </View> */}
            <View
                style={styles.btn}>
                <Button
                title="Update User"
                onPress={() => updateUser()}
                />
            </View>
            <View
                style={styles.btn}>
                <Button
                title="Delete Users"
                onPress={() => deleteUser()}
                />
            </View>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn:{
        width: '90%',
        height: 50
    }

});

