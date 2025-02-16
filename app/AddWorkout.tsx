import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootStackParamList } from '@/types/navigation';
import { TextInput } from 'react-native-gesture-handler';
import { Exercise } from '@/types/exercise';
import { getExercises } from '@/api/workOutAPI';
import { addExerciseToWorkoutPlan } from '@/db/workoutPlan';



export default function AddWorkoutScreen() {

  const route = useRoute<RouteProp<RootStackParamList, "AddWorkout">>();
  const navigation = useNavigation();
  const { day, userId, workoutPlanName } = route.params

  //useStates for holding user inputs for exercise,reps,sets etc.
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const addWorkout = async () => {
    console.log("Add Workout button clicked!");
    console.log(`Selected Exercise: ${selectedExercise}`);
    console.log(`Sets: ${sets}`);
    console.log(`Reps: ${reps}`);

    if (!selectedExercise || !sets || !reps) {
      console.error("Please fill in all fields.");
      return;
    }


    console.log(`Attempting to add: ${selectedExercise}, Sets: ${sets}, Reps: ${reps}`)

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
        console.log("✅ Exercise successfully added!");
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

  //calls API to search for exercise by name
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

  //shows loading message while fetching exercises
  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading exercises...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add a Workout</ThemedText>
      <ThemedText >
      </ThemedText>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ThemedText style={styles.backArrow}>←</ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.placeholder}>Select Exercise</ThemedText>
      <TextInput style={styles.input}
        placeholder='Exercise Search'
        value={name}
        onChangeText={(text) => setName(text)}
        onSubmitEditing={() => setSearchTerm(name)}
      />
      {/*Shows results from API search */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log(`Exercise Selected: ${item.name}`); // Debug log
              setSelectedExercise(item.name);
            }}
          >
            <ThemedView style={styles.exerciseCard}>
              <ThemedText style={styles.exerciseTitle}>
                {item.name}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />

      <ThemedText style={styles.placeholder}>{selectedExercise}</ThemedText>
      <ThemedText style={styles.placeholder}>Enter Sets and Reps Below</ThemedText>
      <ThemedText style={styles.placeholder}>Sets</ThemedText>
      <TextInput style={styles.input}
        placeholder='Number of Sets'
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />
      <ThemedText style={styles.placeholder}>Reps</ThemedText>
      <TextInput style={styles.input}
        placeholder='Number of Reps'
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps} />
      <TouchableOpacity style={styles.addButton} onPress={addWorkout}>
        <ThemedText>Add Workout</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backArrow: {
    fontSize: 40,
    color: "#333",
  },
  placeholder: {
    marginVertical: 20,
    fontSize: 25,
    marginTop: 30,
  },
  backButton: {
    marginTop: 55,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    position: 'absolute',
    left: 10,
  },
  addButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignSelf: 'center',

  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
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
  },
});