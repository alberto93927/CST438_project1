import React from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { router } from "expo-router";

export default function AuthScreen() {
    const { signIn } = useSession();

    const handleSignIn = async () => {
        await signIn();
        router.replace("/");
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Fitness App</ThemedText>
            <Button
                title="Sign In With Google"
                onPress={handleSignIn}
            />
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