import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import { fetchWorkoutExercises, updateWorkoutExerciseByName, deleteExerciseFromWorkoutPlanByName } from "@/db/workoutPlan";

export default function EditWorkoutScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "editWorkout">>();
  const navigation = useNavigation();
  const { day } = route.params;

  const [workoutExercises, setWorkoutExercises] = useState<{ name: string; sets: number; reps: number }[]>([]);

  // Load exercises from the database when the screen loads
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exercises = await fetchWorkoutExercises(day);
        setWorkoutExercises(exercises);
      } catch (error) {
        console.error("Failed to fetch workout exercises:", error);
      }
    };

    loadExercises();
  }, []);

  // Update sets and reps in the database using exercise name
  const handleUpdateExercise = async (name: string, sets: number, reps: number) => {
    const success = await updateWorkoutExerciseByName(name, sets, reps);
    if (success) {
      setWorkoutExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.name === name ? { ...exercise, sets, reps } : exercise
        )
      );
    }
  };

  // Delete an exercise from the workout plan using exercise name
  const handleDeleteExercise = async (name: string) => {
    const success = await deleteExerciseFromWorkoutPlanByName(name);
    if (success) {
      setWorkoutExercises((prevExercises) => prevExercises.filter((exercise) => exercise.name !== name));
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Edit Workout - {day}</Text>

      {/* List of Exercises with Editable Sets/Reps */}
      <FlatList
        data={workoutExercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>

            {/* Editable Sets Input */}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.sets.toString()}
              onChangeText={(text) => handleUpdateExercise(item.name, parseInt(text) || 0, item.reps)}
            />

            {/* Editable Reps Input */}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={item.reps.toString()}
              onChangeText={(text) => handleUpdateExercise(item.name, item.sets, parseInt(text) || 0)}
            />

            {/* Delete Button */}
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteExercise(item.name)}>
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  exerciseName: {
    fontSize: 18,
    flex: 2,
  },
  input: {
    width: 50,
    borderBottomWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 16,
  },
  deleteButton: {
    padding: 5,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
  },
});

