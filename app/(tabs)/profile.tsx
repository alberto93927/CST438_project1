import React, { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { GoogleUser } from "@/types/user";
import useProfile from "@/hooks/useProfile";
import { ProfilePic } from "@/components/ProfilePic";

export default function ProfileScreen() {
    const { signOut } = useSession();
    const { profile } = useProfile();
    console.log(profile)

    return (
        <ThemedView style={styles.container}>
            <ProfilePic />
            <ThemedText type="title">{profile?.user?.username}</ThemedText>
            <ThemedText type="subtitle">{profile?.user?.email}</ThemedText>
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
