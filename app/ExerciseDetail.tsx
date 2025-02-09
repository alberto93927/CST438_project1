import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootStackParamList } from '@/types/navigation';
import { getExerciseDetail } from '@/api/workOutAPI';
import { Exercise } from '@/types/exercise';
import { useRouter } from 'expo-router';


type ExerciseDetailRouteProp = RouteProp<RootStackParamList, 'ExerciseDetail'>;

export default function ExerciseDetailScreen() {
  const route = useRoute<ExerciseDetailRouteProp>();
  const { exercise } = route.params;
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //fetches exercise details based of off exercise name that was clicked on in explore page
  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        const detail = await getExerciseDetail({ name: exercise.name });
        setExerciseDetail(detail);
      } catch (error) {
        console.error('Error fetching exercise detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseDetail();
  }, [exercise.name]);

  //shows loading message while fetching exercises details
  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading exercise details...</ThemedText>
      </ThemedView>
    );
  }

  if (!exerciseDetail) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Exercise details not available.</ThemedText>
      </ThemedView>
    );
  }

  //displays exercise details
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/explore')}>
        <ThemedText style={styles.backButtonText}>← Back</ThemedText>
      </TouchableOpacity>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{exerciseDetail.name}</ThemedText>
      </ThemedView>
      <ScrollView style={styles.scrollItem}>
        <ThemedText style={styles.exerciseItem}>Type: {exerciseDetail.type}</ThemedText>
        <ThemedText style={styles.exerciseItem}>Equipment: {exerciseDetail.equipment}</ThemedText>
        <ThemedText style={styles.exerciseItem}>Difficulty: {exerciseDetail.difficulty}</ThemedText>
        <ThemedText style={styles.exerciseItem}>Instructions: {exerciseDetail.instructions}</ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titleContainer: {
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  exerciseItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  scrollItem: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
