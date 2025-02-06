// app/(tabs)/WorkoutDay.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootStackParamList } from '@/types/navigation'; // Import your navigation types

export default function WorkoutDayScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'WorkoutDay'>>(); // Use the route types
  const navigation = useNavigation();
  const { day, workout } = route.params;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{day}</ThemedText>
      <ThemedText type="subtitle">{workout}</ThemedText>
      <ThemedText style={styles.placeholder}>
        Here you can add or modify workouts, sets, and reps for {day}.
      </ThemedText>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ThemedText>Go Back</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    marginVertical: 20,
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignSelf: 'center',
  },
});
