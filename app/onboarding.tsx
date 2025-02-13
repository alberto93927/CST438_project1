import React, { useEffect, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { router } from "expo-router";
import { createUser } from "@/db/user";
import { useSQLiteContext } from "expo-sqlite";
import { createProfile } from "@/db/profile";
import { GoogleUser } from "@/types/user";

export default function OnboardingScreen() {
    const { session } = useSession();
    const [googleUser, setGoogleUser] = useState<GoogleUser | null>(null);
    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [skillLevel, setSkillLevel] = useState();

    const db = useSQLiteContext();


    useEffect(() => {
        if (session) {
            setGoogleUser(JSON.parse(session))
        }

    }, [])

    const userInit = async () => {
        return await createUser({
            g_id: googleUser?.id || "",
            username: googleUser?.name || "",
            email: googleUser?.email || "",
            profile_pic: googleUser?.photo || ""
        })
    }

    userInit();

    const getUsers = async () => {
        const res = await db.getAllAsync('SELECT * FROM user');
        console.log(res);
    }

    const handleSubmit = async () => {
        userInit();
        getUsers();
        await createProfile({
            user_id: '1',
            age: age || 0,
            height: height || 0,
            weight: weight || 0,
            skill_level: skillLevel || "Beginner"
        })
        router.navigate("/")
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Welcome {googleUser?.name}</ThemedText>
            <TextInput placeholder="Age" onChangeText={(e) => setAge} style={styles.input} />
            <TextInput placeholder="Height" onChangeText={(e) => setHeight} style={styles.input} />
            <TextInput placeholder="Weight" onChangeText={(e) => setWeight} style={styles.input} />
            <TextInput placeholder="Skill level" style={styles.input} />
            <Button onPress={handleSubmit} title="Add info" />
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
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
});