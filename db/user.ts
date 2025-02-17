import * as SQLite from "expo-sqlite";
import type { User } from "@/types/user";

export const createUser = async (user: User) => {
    console.log('Creating user:', user)

    const db = await SQLite.openDatabaseAsync('flexzone_database');

    const exists = await getUserByGoogleId(user.g_id);
    if (exists) {
        console.log('User already exists:', exists)
        return exists;
    }

    const response = await db.runAsync('INSERT INTO user (g_id, username, email, profile_pic) VALUES (?, ?, ?, ?)', [
        user.g_id, user.username, user.email, user.profile_pic
    ])

    return response.lastInsertRowId;
}

export const getUserByGoogleId = async (g_id: string) => {
    console.log('Getting user by google id:', g_id)
    const db = await SQLite.openDatabaseAsync('flexzone_database');

    const user = await db.getFirstAsync('SELECT * FROM user WHERE g_id = ?', [g_id]);
    console.log('User: ', user)

    return user;
}