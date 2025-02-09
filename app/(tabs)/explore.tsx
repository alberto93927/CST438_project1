import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getExercises } from '../../api/workOutAPI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Exercise } from '@/types/exercise';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

export default function ExploreScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [loading, setLoading] = useState(true);
  const muscles = [
    { label: "Abs", value: "abdominals" },
    { label: "Abductors", value: "abductors" },
    { label: "Adductors", value: "adductors" },
    { label: "Biceps", value: "biceps" },
    { label: "Calves", value: "calves" },
    { label: "Chest", value: "chest" },
    { label: "Forearms", value: "forearms" },
    { label: "Glutes", value: "glutes" },
    { label: "Hamstrings", value: "hamstrings" },
    { label: "Lats", value: "lats" },
    { label: "Lower Back", value: "lower_back" },
    { label: "Middle Back", value: "middle_back" },
    { label: "Neck", value: "neck" },
    { label: "Quads", value: "quadriceps" },
    { label: "Traps", value: "traps" },
    { label: "Triceps", value: "triceps" },
  ];

  type NavigationProp = StackNavigationProp<RootStackParamList, 'ExerciseDetail'>;
  const navigation = useNavigation<NavigationProp>();

  //fetching exercises from the API depending on which muscle is selected
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const exercises = await getExercises({ muscle: selectedMuscle });
        setExercises(exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedMuscle]);

  //shows loading message while fetching exercises
  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading exercises...</ThemedText>
      </ThemedView>
    );
  }

  //UI for the page with a Picker based off the muscles from above
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Exercises</ThemedText>
      </ThemedView>
      {<Picker
        selectedValue={selectedMuscle}
        onValueChange={(itemValue) => setSelectedMuscle(itemValue)}
        style={styles.picker}
      >
        {muscles.map((muscle, index) => (
          <Picker.Item key={index} label={muscle.label} value={muscle.value} />
        ))}

      </Picker>}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
          >
            <ThemedView style={styles.exerciseCard}>
              <ThemedText style={styles.exerciseTitle}>
                {item.name}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 16,
  },
  picker: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
