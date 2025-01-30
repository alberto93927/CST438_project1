import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { GoogleUser } from "@/types/user";

export default function ProfileScreen() {
    const { session, signOut } = useSession();
    const [user, setUser] = useState<GoogleUser | null>(null);

    useEffect(() => {
        if (session) {
            setUser(JSON.parse(session));
        }
    }, [session]);

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">{user?.name}</ThemedText>
            <ThemedText type="subtitle">{user?.email}</ThemedText>
            <Button
                title="Sign Out"
                onPress={signOut}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
