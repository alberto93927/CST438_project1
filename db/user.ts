import { useSQLiteContext } from "expo-sqlite";
import type { User } from "@/types/user";


export const createUser = async (user: User) => {
    const db = useSQLiteContext();

    // Check if user exists before creating
    const exists = await db.getFirstAsync('SELECT * FROM user WHERE g_id = ?', [user.g_id]);

    if (exists) {
        return exists;
    }

    const statement = await db.prepareAsync(
        'INSERT INTO user (g_id, username, email, profile_pic) VALUES (?, ?, ?, ?)'
    );
    const response = await statement.executeAsync({
        1: user.g_id,
        2: user.username,
        3: user.email,
        4: user.profile_pic
    });

    return response;
}