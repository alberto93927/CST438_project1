import * as SQLite from 'expo-sqlite';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, FlatList, Button, Alert } from 'react-native';
import { getExercises} from '../../api/wgerAPI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Exercise } from '@/types/exercise';


const initDB = async () => {
    console.log('Initializing database...');
    
        try{

            const db = await SQLite.openDatabaseAsync('flexzone_database');

            await db.execAsync(`
            
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL,
                    api_token TEXT
                );

                CREATE TABLE IF NOT EXISTS exercises (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT,
                    muscle_group TEXT,
                    api_id TEXT UNIQUE
                );

                CREATE TABLE IF NOT EXISTS workout_plans (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    name TEXT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(id)
                );

                `);

        }catch (e){
            console.error("error: ", e);
        }

}

const insertUser = async () => {
    console.log('Inserting user into database...');
    
        try{

            const db = await SQLite.openDatabaseAsync('flexzone_database');

            // `runAsync()` is useful when you want to execute some write operations.
            const result = await db.runAsync('INSERT INTO users (id, username, password, api_token) VALUES (?, ?, ?, ?)', 2, 'alberto2', 'albertopassword2', 'abc2');
            console.log(result.lastInsertRowId, result.changes);

        }catch (e){
            console.error("error: ", e);
        }

}

type User = {
    id: number;
    username: string;
    password: string;
    api_token: string | null; // Nullable since it might be NULL in the database
};

const selectUser = async () => {
    console.log("Fetching users from database...");

    try {
        const db = await SQLite.openDatabaseAsync("flexzone_database");

        // Explicitly cast the result to an array of User[]
        const allRows = (await db.getAllAsync("SELECT * FROM users")) as User[];

        // Iterate over typed rows
        for (const row of allRows) {
            console.log(`ID: ${row.id}, Username: ${row.username}, Password: ${row.password}, API Token: ${row.api_token}`);
        }

    } catch (e) {
        console.error("Database error:", e);
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
            <View
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
            </View>
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
