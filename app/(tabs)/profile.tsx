import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { selectUser } from "./db-service";

export default function ProfileScreen() {
    const { session, signOut } = useSession();
    const [storedUser, setStoredUser] = useState<any | null>(null);

    useEffect(() => {
        if (session) {
            try {
                const parsedSession = JSON.parse(session); // Convert string to object
                if (parsedSession?.id) {
                    selectUser(parsedSession.id, (user) => {
                        setStoredUser(user);
                    });
                }
            } catch (error) {
                console.error("Error parsing session:", error);
            }
        }
    }, [session]);

    return (
        <ThemedView style={styles.container}>
            {/* Display profile picture if available */}
            {storedUser?.profile_pic && (
                <Image source={{ uri: storedUser.profile_pic }} style={styles.profileImage} />
            )}
            {/* Display user name */}
            <ThemedText type="title">{storedUser?.username || "Guest"}</ThemedText>
            {/* Display user email */}
            <ThemedText type="subtitle">{storedUser?.email || "No Email"}</ThemedText>
            <Button title="Sign Out" onPress={signOut} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
});
