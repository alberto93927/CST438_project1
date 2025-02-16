import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";


export default function EditWorkoutScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'EditWorkout'>>(); // Use the route types
  const navigation = useNavigation();

  // Hardcoded list of exercises
  const [exercises, setExercises] = useState([
    { id: "1", name: "Incline Chest Press", selected: false },
    { id: "2", name: "Flat Chest Press", selected: false },
    { id: "3", name: "Shoulder Press", selected: false },
    { id: "4", name: "Lateral Raises", selected: false },
    { id: "5", name: "Tricep Pushdowns", selected: false },
    { id: "6", name: "Tricep Extensions", selected: false },
  ]);

  // Function to toggle checkbox
  const toggleSelection = (id: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((exercise) =>
        exercise.id === id ? { ...exercise, selected: !exercise.selected } : exercise
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Edit Workout</Text>

      {/* List of Exercises */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <CheckBox
              checked={item.selected}
              onPress={() => toggleSelection(item.id)}
              containerStyle={styles.checkbox}
            />
            <TextInput style={styles.input} value={item.name} editable={false} />
          </View>
        )}
      />

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    padding: 0,
    margin: 0,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  deleteButton: {
    marginTop: 20,
    padding: 12, 
    backgroundColor: "red",
    borderRadius: 8,
    alignSelf: "center",
  },
  deleteText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
