import React, { useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { router } from "expo-router";
import { initDB, insertUser } from "./(tabs)/db-service";

export default function AuthScreen() {
    const { signIn } = useSession();

    // Initialize database when the app starts
    useEffect(() => {
        initDB();
    }, []);

    const handleSignIn = async () => {
        const userSession = await signIn(); // Ensure signIn() returns session data
        if (userSession !== null) {
            try {
                const user = JSON.parse(userSession);
                await insertUser(user.id, user.name, user.email, user.photo);
                console.log("User successfully inserted into the database!");
                router.replace("/");
            } catch (error) {
                console.error("Error processing user sign-in:", error);
            }
        }
    };
    

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Fitness App</ThemedText>
            <Button title="Sign In With Google" onPress={handleSignIn} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 64
    },
});
