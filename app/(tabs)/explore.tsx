import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, FlatList } from 'react-native';
import { getExercises} from '../../api/wgerAPI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Exercise } from '@/.expo/types/exercise';

export default function TabTwoScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await getExercises();
        setExercises(exercises);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading exercises...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Exercises</ThemedText>
      </ThemedView>
      <ThemedText>Browse exercises.</ThemedText>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.exerciseItem}>
            <ThemedText style={styles.categoryName}>Category: {item.category.name}</ThemedText>
          {item.exercises && item.exercises.length > 0 ? (
            <FlatList
            data = {item.exercises}
            keyExtractor={(subItem) => subItem.id.toString()}
            renderItem={({item: subExercise}) => ( 
              <ThemedText style={styles.subExerciseName}>- {subExercise.name}</ThemedText>
            )}
            />):(
              <ThemedText style={styles.subExerciseName}>No exercises avaiable</ThemedText>
            )}
          </ThemedView>
        )}
        />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 50,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  exerciseItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  categoryName: {
    fontSize: 18,
    color: 'black',
  },

  subExerciseName: {
    fontSize:16,
    color:'black',
    marginLeft: 10,
  },

});
