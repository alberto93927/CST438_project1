import * as SQLite from "expo-sqlite";
import type { Profile } from "@/types/profile";

export const createProfile = async (profile: Profile) => {
}

export const getProfile = async (user_id: string) => {
    const db = SQLite.openDatabaseAsync('flexzone_database')

    const profile = await (await db).getFirstAsync('SELECT * FROM profile WHERE user_id = ?', [user_id]);

    return profile
}
