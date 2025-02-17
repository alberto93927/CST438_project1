import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, TextInput, View } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootStackParamList } from '@/types/navigation';
import { Exercise } from '@/types/exercise';
import { getExercises } from '@/api/workOutAPI';
import { addExerciseToWorkoutPlan } from '@/db/workoutPlan';

export default function AddWorkoutScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "AddWorkout">>();
  const navigation = useNavigation();
  const { day, userId, workoutPlanName } = route.params;

  // useStates for holding user inputs for exercise, reps, sets, etc.
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const addWorkout = async () => {
    console.log("Add Workout button clicked!");
    if (!selectedExercise || !sets || !reps) {
      console.error("Please fill in all fields.");
      return;
    }

    console.log(`Attempting to add: ${selectedExercise}, Sets: ${sets}, Reps: ${reps}`);

    try {
      const success = await addExerciseToWorkoutPlan(
        userId,
        workoutPlanName,
        selectedExercise,
        day,
        parseInt(sets),
        parseInt(reps)
      );

      if (success) {
        console.log("Exercise successfully added!");
        setSelectedExercise("");
        setSets("");
        setReps("");
        alert("Workout added! Add another or go back.");
      } else {
        console.error("Failed to add exercise.");
      }
    } catch (error) {
      console.error("Error calling addExerciseToWorkoutPlan:", error);
    }
  };

  // calls API to search for exercise by name
  useEffect(() => {
    if (!searchTerm) return;

    const fetchExercises = async () => {
      setLoading(true);
      try {
        const exercises = await getExercises({ name: searchTerm });
        setExercises(exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [searchTerm]);

  // shows loading message while fetching exercises
  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading exercises...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>

      <ThemedText type="title">Add a Workout</ThemedText>

      <ThemedText style={styles.placeholder}>Select Exercise</ThemedText>
      <TextInput
        style={styles.input}
        placeholder='Exercise Search'
        value={name}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={() => setSearchTerm(name)}
      />

      {/* Shows results from API search */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedExercise(item.name)}>
            <ThemedView style={styles.exerciseCard}>
              <ThemedText style={styles.exerciseTitle}>{item.name}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />

      <ThemedText style={styles.placeholder}>{selectedExercise}</ThemedText>
      <ThemedText style={styles.placeholder3}>Enter Sets and Reps Below</ThemedText>
      <ThemedText style={styles.placeholder2}>Sets</ThemedText>
      <TextInput
        style={styles.input}
        placeholder='Number of Sets'
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />
      <ThemedText style={styles.placeholder2}>Reps</ThemedText>
      <TextInput
        style={styles.input}
        placeholder='Number of Reps'
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />
      <TouchableOpacity style={styles.button} onPress={addWorkout}>
        <ThemedText type="default">Add Workout</ThemedText>
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
  placeholder: {
    marginVertical: 10,
    fontSize: 25,
    marginTop: 30,
  },
  placeholder2: {
    marginVertical: 10,
    fontSize: 25,
    marginTop: 5,
  },
  placeholder3: {
    marginVertical: 20,
    fontSize: 25,
    marginTop: 5,
    fontStyle: "italic",
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
    fontStyle: "italic",
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
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
  buttonText: {
    color: "#fff",
    fontSize: 30,
  },
});