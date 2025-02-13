import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootStackParamList } from '@/types/navigation';
import { TextInput } from 'react-native-gesture-handler';

export default function AddWorkoutScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'AddWorkout'>>(); // Use the route types
  const navigation = useNavigation();
  //const { day, workout } = route.params;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Add a Workout</ThemedText>
      <ThemedText >
      </ThemedText>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ThemedText>Go Back</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.placeholder}>Select Exercise</ThemedText>
      
      <ThemedText style={styles.placeholder}>Enter Sets and Reps Below</ThemedText>
      <ThemedText style={styles.placeholder}>Sets</ThemedText>
      <TextInput style={styles.input} placeholder='Number of Sets' />
      <ThemedText style={styles.placeholder}>Reps</ThemedText>
      <TextInput style={styles.input} placeholder='Number of Reps' />
      <TouchableOpacity style={styles.addButton}>
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
  placeholder: {
    marginVertical: 20,
    fontSize: 25,
    marginTop: 50,
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
   marginTop:30,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
   alignSelf:'center',
   
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 3,
    borderColor: '#007AFF',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  }
});
