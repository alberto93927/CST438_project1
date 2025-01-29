import * as SQLite from 'expo-sqlite';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, FlatList, Button, Alert } from 'react-native';
import { getExercises} from '../../api/wgerAPI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Exercise } from '@/types/exercise';


const initDB = async () => {
    console.log('initDB');
    
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
    console.log('insertUser:');
    
        try{

            const db = await SQLite.openDatabaseAsync('flexzone_database');

            // `runAsync()` is useful when you want to execute some write operations.
            const result = await db.runAsync('INSERT INTO users (id, username, password, api_token) VALUES (?, ?, ?, ?)', 1, 'alberto', 'albertopassword', 'abc');
            console.log(result.lastInsertRowId, result.changes);

        }catch (e){
            console.error("error: ", e);
        }

}

const selectUser = async () => {
    console.log('selectUser:');
    
        try{

            const db = await SQLite.openDatabaseAsync('flexzone_database');

            // `getAllAsync()` is useful when you want to get all results as an array of objects.
            const allRows = await db.getAllAsync('SELECT * FROM users');
            for (const row of allRows) {
                
            }

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
