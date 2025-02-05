import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Image, FlatList, Text, TextInput, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { selectUser, fetchWorkoutPlans, insertWorkoutPlan, deleteWorkoutPlan } from "./db-service";

export default function ProfileScreen() {
    const { session, signOut } = useSession();
    const [storedUser, setStoredUser] = useState<any | null>(null);
    const [workoutPlans, setWorkoutPlans] = useState<any[]>([]);
    const [newWorkoutPlan, setNewWorkoutPlan] = useState("");

    useEffect(() => {
        if (session) {
            try {
                const parsedSession = JSON.parse(session);
                if (parsedSession?.id) {
                    selectUser(parsedSession.id, (user) => {
                        setStoredUser(user);
                        fetchWorkoutPlans(parsedSession.id, setWorkoutPlans);
                    });
                }
            } catch (error) {
                console.error("Error parsing session:", error);
            }
        }
    }, [session]);

    const handleAddWorkoutPlan = async () => {
        if (!newWorkoutPlan.trim()) return;
        await insertWorkoutPlan(storedUser.id, newWorkoutPlan);
        fetchWorkoutPlans(storedUser.id, setWorkoutPlans);
        setNewWorkoutPlan("");
    };

    const handleDeleteWorkoutPlan = async (id: number) => {
        await deleteWorkoutPlan(id);
        fetchWorkoutPlans(storedUser.id, setWorkoutPlans);
    };

    return (
        <ThemedView style={styles.container}>
            {storedUser?.profile_pic && (
                <Image source={{ uri: storedUser.profile_pic }} style={styles.profileImage} />
            )}
            <ThemedText type="title">{storedUser?.username || "Guest"}</ThemedText>
            <ThemedText type="subtitle">{storedUser?.email || "No Email"}</ThemedText>

            {/* Add New Workout Plan */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Workout Plan"
                    value={newWorkoutPlan}
                    onChangeText={setNewWorkoutPlan}
                />
                <Button title="Add" onPress={handleAddWorkoutPlan} />
            </View>

            {/* Workout Plans List */}
            <FlatList
                data={workoutPlans}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.workoutPlan}>
                        <Text style={styles.workoutName}>{item.name}</Text>
                        <Button title="❌" onPress={() => handleDeleteWorkoutPlan(item.id)} />
                    </View>
                )}
            />

            <Button title="Sign Out" onPress={signOut} />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
        width: "100%",
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginRight: 8,
    },
    workoutPlan: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        width: "100%",
    },
    workoutName: {
        fontSize: 16,
    },
});
