import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { RootStackParamList } from '@/types/navigation';
import { getExerciseDetail } from '@/api/wgerAPI';
import { Exercise } from '@/types/exercise';

type ExerciseDetailRouteProp = RouteProp<RootStackParamList, 'ExerciseDetail'>;

export default function ExerciseDetailScreen() {
  const route = useRoute<ExerciseDetailRouteProp>();
  const { exercise } = route.params;
  const [exerciseDetail, setExerciseDetail] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        const detail = await getExerciseDetail(exercise.id);
        setExerciseDetail(detail);
      } catch (error) {
        console.error('Error fetching exercise detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseDetail();
  }, [exercise.id]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{exerciseDetail.name}</ThemedText>
      </ThemedView>
      <ThemedText>Category: {exerciseDetail.category.name}</ThemedText>
      {/* <ThemedText>Equipment: {exerciseDetail.equipment.map(e => e.name).join(', ')}</ThemedText> */}
      <ThemedText>Description: {exerciseDetail.exercises[0].description}</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    marginBottom: 20,
  },
});
