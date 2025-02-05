import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Image, FlatList, Text, TextInput, View, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { selectUser, fetchWorkoutPlans, insertWorkoutPlan, deleteWorkoutPlan, fetchExercisesForWorkout, insertExerciseAndLinkToWorkout } from "./db-service";

export default function ProfileScreen() {
    const { session, signOut } = useSession();
    const [storedUser, setStoredUser] = useState<any | null>(null);
    const [workoutPlans, setWorkoutPlans] = useState<any[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
    const [exercises, setExercises] = useState<any[]>([]);
    const [newWorkoutPlan, setNewWorkoutPlan] = useState("");
    const [newExercise, setNewExercise] = useState("");

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

    const handleSelectWorkout = async (id: number) => {
        setSelectedWorkout(id);
        fetchExercisesForWorkout(id, setExercises);
    };

    const handleAddExercise = async () => {
        if (!newExercise.trim() || selectedWorkout === null) return;
    
        try {
            // Insert new exercise and link it to the selected workout
            await insertExerciseAndLinkToWorkout(selectedWorkout, newExercise);
    
            // Refresh exercises list
            fetchExercisesForWorkout(selectedWorkout, setExercises);
            setNewExercise(""); // Clear input
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
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
                    <TouchableOpacity onPress={() => handleSelectWorkout(item.id)} style={styles.workoutPlan}>
                        <Text style={styles.workoutName}>{item.name}</Text>
                        <Button title="❌" onPress={() => handleDeleteWorkoutPlan(item.id)} />
                    </TouchableOpacity>
                )}
            />

            {/* Add Exercises to Selected Workout */}
            {selectedWorkout && (
                <View style={styles.exerciseContainer}>
                    <Text style={styles.sectionTitle}>Exercises for Selected Workout</Text>
                    <FlatList
                        data={exercises}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <Text style={styles.exerciseText}>{item.name}</Text>}
                    />
                    <TextInput
                        style={styles.exerciseInput}
                        placeholder="New Exercise"
                        value={newExercise}
                        onChangeText={setNewExercise}
                    />
                    <Button title="Add Exercise" onPress={handleAddExercise} />
                </View>
            )}


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
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
        fontSize: 16,
    },
    exerciseInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        fontSize: 16,
        width: "100%",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
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
    exerciseContainer: {
        marginTop: 20,
        width: "100%",
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#eef",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    exerciseText: {
        fontSize: 16,
        paddingVertical: 5,
        textAlign: "center",
    },
});
