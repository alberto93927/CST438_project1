import { useSQLiteContext } from "expo-sqlite";
import type { Profile } from "@/types/profile";

export const createProfile = async (profile: Profile) => {
    const db = useSQLiteContext();

    const statement = await db.prepareAsync(
        'INSERT INTO profile (user_id, age, weight, height, skill_level) VALUES (?, ?, ?, ?, ?)'
    );
    const response = await statement.executeAsync({
        1: profile.user_id,
        2: profile.age,
        3: profile.weight,
        4: profile.height,
        5: profile.skill_level
    });

    return response;
}

export const getProfile = async ({user_id}: { user_id: string}) => {
    const db = useSQLiteContext();

    const statement = await db.prepareAsync('SELECT * FROM profile WHERE user_id = ?');

    const response = await statement.executeAsync(user_id);

    return await response.getFirstAsync()
}
