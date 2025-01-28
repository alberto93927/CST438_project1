import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { initializeDatabase } from "../db/statements";
import { addUser, getExercises } from "../db/dbOperations";

export default function App() {
  useEffect(() => {
    initializeDatabase();

    // Example usage
    addUser("john_doe", "secure_password", "api_token_123", (error: Error | null, result?: any) => {
      if (error) {
        console.error("Error adding user:", error);
        alert("Error adding user: " + error)
      } else {
        console.log("User added successfully:", result);
        alert("User added successfully: " + result)
      }
    });

    getExercises((error: Error | null, exercises?: any[]) => {
      if (error) {
        console.error("Error fetching exercises:", error);
        alert("Error fetching exercises:" + error)
      } else {
        console.log("Exercises:", exercises);
        alert("Exercises: " +  exercises)
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SQLite Database Initialized</Text>
    </View>
  );
}
