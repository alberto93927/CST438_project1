import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, FlatList } from 'react-native';
import { getExercises, Exercise } from '../api/wgerAPI';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const exercises = await getExercises();
        exercises.forEach((exercise: any) => {
            console.log("Exercise ID:", exercise.id);
            console.log("Category Name:", exercise.category.name);

            if (exercise.exercises && exercise.exercises.length > 0) {
                exercise.exercises.forEach((subExercise: any) => {
                    console.log("Sub-Exercise Name:", subExercise.name);
                });
            } else {
                console.log("No sub-exercises found for this exercise.");
            }
        });

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
      <View style={styles.container}>
        <Text>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Exercises</ThemedText>
      </ThemedView>
      <ThemedText>Browse exercises.</ThemedText>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Text style={styles.categoryName}>Category: {item.category.name}</Text>
          {item.exercises && item.exercises.length > 0 ? (
            <FlatList
            data = {item.exercises}
            keyExtractor={(subItem) => subItem.id.toString()}
            renderItem={({item: subExercise}) => ( 
              <Text style={styles.subExerciseName}>- {subExercise.name}</Text>
            )}
            />):(
              <Text style={styles.subExerciseName}>No exercises avaiable</Text>
            )}
          </View>
        )}
        />
    </View>
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
