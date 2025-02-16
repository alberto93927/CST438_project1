import * as SQLite from "expo-sqlite";
import type { Profile } from "@/types/profile";

export const createProfile = async (profile: Profile) => {
    const db = SQLite.openDatabaseAsync('flexzone_database')

    const exists = await getProfile(profile.user_id);
    if (exists) {
        console.log('Profile already exists:', exists)
        return exists;
    }

    const response = await (await db).runAsync('INSERT INTO profile (user_id, age, weight, height, skill_level) VALUES (?, ?, ?, ?, ?)', [
        profile.user_id, profile.age, profile.weight, profile.height 
    ])


}

export const getProfile = async (user_id: string | number) => {
    const db = await SQLite.openDatabaseAsync('flexzone_database')

    const user = await db.getFirstAsync('SELECT * FROM user WHERE id = ?', [user_id]);
    const profile = await db.getFirstAsync('SELECT * FROM profile WHERE user_id = ?', [user_id]);

    const userData = {
        user,
        profile
    };

    return userData 
}
