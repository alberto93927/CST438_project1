import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getExercises, getLanguages } from '../../api/wgerAPI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Exercise } from '@/types/exercise';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

export default function ExploreScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [languages, setLanguages] = useState<{ id: number; full_name: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(2); // Default english language
  const [loading, setLoading] = useState(true);

  type NavigationProp = StackNavigationProp<RootStackParamList, 'ExerciseDetail'>;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const languageList = await getLanguages();
        setLanguages(languageList);
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const exercises = await getExercises({ language: selectedLanguage });
        setExercises(exercises);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [selectedLanguage]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading exercises...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Exercises</ThemedText>
      </ThemedView>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        style={styles.picker}
      >
        {languages.map((language) => (
          <Picker.Item key={language.id} label={language.full_name} value={language.id} />
        ))}
      </Picker>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
          >
            <ThemedView style={styles.exerciseCard}>
              <ThemedText style={styles.exerciseTitle}>
                Category: {item.category.name}
              </ThemedText>
              {item.exercises && item.exercises.length > 0 && (
                <FlatList
                  data={item.exercises}
                  keyExtractor={(subItem) => subItem.id.toString()}
                  renderItem={({ item: subExercise }) => (
                    <ThemedText style={styles.subExerciseName}>
                      - {subExercise.name}
                    </ThemedText>
                  )}
                />
              )}
            </ThemedView>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
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
  subExerciseName: {
    marginLeft: 10,
    fontSize: 14,
  },
});
