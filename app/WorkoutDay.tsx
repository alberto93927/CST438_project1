import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import { useRoute, useNavigation, RouteProp, NavigationProp } from "@react-navigation/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RootStackParamList } from "@/types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWorkoutExercises } from "@/db/workoutPlan";

// Static Workout List (Replace with API later)
const initialWorkouts = [
  "Incline Chest Press",
  "Flat Chest Press",
  "Shoulder Press",
  "Lateral Raises",
  "Tricep Pushdown",
  "Tricep Extensions",
];

export default function WorkoutDayScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "WorkoutDay">>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  //const AddNavigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { day, workout } = route.params;
  //const router = useRouter();

  // Editable workout name
  const [workoutName, setWorkoutName] = useState(workout);
  const [workoutExercises, setWorkoutExercises] = useState<{ name: string; sets: number; reps: number }[]>([]);


  useEffect(() => {
    const saveWorkoutName = async () => {
      try {
        await AsyncStorage.setItem(day, workoutName);
      } catch (error) {
        console.error("Failed to save workout name", error);
      }
    };

    saveWorkoutName();
  }, [workoutName, day]);

  //fetching workouts from DB
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const exercises = await fetchWorkoutExercises(day);
        setWorkoutExercises(exercises);
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      }
    };

    loadExercises();
  }, []);

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>

      {/* Editable Workout Name */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">{day}:</ThemedText>
        <TextInput
          style={styles.inputBox}
          value={workoutName}
          onChangeText={setWorkoutName} // Auto-saves on change
          placeholder="Enter Workout Name"
          placeholderTextColor="#888"
        />
      </View>

      {/* Workout List */}
      <ThemedText type="subtitle" style={styles.workoutListTitle}>
        Workouts List
      </ThemedText>
      <FlatList
        data={initialWorkouts}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <ThemedText style={styles.workoutItem}>• {item}</ThemedText>
        )}
        contentContainerStyle={styles.workoutList}
      />

        {/* WorkoutList from DB */}
      <ThemedText type="subtitle" style={styles.workoutListTitle}>
        Workout Plan Exercises
      </ThemedText>
      <FlatList
        data={workoutExercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ThemedText style={styles.workoutItem}>
            • {item.name} - {item.sets} sets x {item.reps} reps
          </ThemedText>
        )}
        contentContainerStyle={styles.workoutList}
      />

      {/* Bottom Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddWorkout",
        { day: day, userId: "test", workoutPlanName: workoutName })}>
        <ThemedText type="default">Add Workout</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <ThemedText type="default">Edit Workout</ThemedText>

      </TouchableOpacity>


    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F8FA",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 40,
    color: "#333",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  inputBox: {
    borderWidth: 2,
    borderColor: "#ccc",
    fontSize: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    color: "#333",
    borderRadius: 5,
  },
  workoutListTitle: {
    marginBottom: 15,
    fontSize: 25,
    color: "#555",
  },
  workoutList: {
    marginBottom: 30,
  },
  workoutItem: {
    fontSize: 18,
    marginBottom: 10,
    color: "#444",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#888",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  editButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",

  },
});

