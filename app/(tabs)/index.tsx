import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import { useSession } from "@/hooks/ctx";
import { GoogleUser } from "@/types/user";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfile from "@/hooks/useProfile";

// Default profile picture (Replace later with Google Profile)
const DEFAULT_PROFILE_PIC = require("@/assets/images/default-profile.png");

// Static Workout Split Data (Replace later with API data)
const workoutSplit = [
  { day: "Monday", workout: "Push Day" },
  { day: "Tuesday", workout: "Pull Day" },
  { day: "Wednesday", workout: "Leg Day" },
  { day: "Thursday", workout: "Chest/Back" },
  { day: "Friday", workout: "Shoulders/Arms" },
  { day: "Saturday", workout: "Leg Day" },
  { day: "Sunday", workout: "Rest" },
];

export default function HomeScreen() {
  const { session } = useSession();
  const [user, setUser] = useState<GoogleUser | null>(null);
  const { profile } = useProfile();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [workoutData, setWorkoutData] = useState(workoutSplit);

  useEffect(() => {
    if (session) {
      setUser(JSON.parse(session));
    }

    const loadWorkoutData = async () => {
      try {
        const updatedWorkoutData = await Promise.all(
          workoutSplit.map(async (item) => {
            const savedWorkout = await AsyncStorage.getItem(item.day);
            return savedWorkout ? { ...item, workout: savedWorkout } : item;
          })
        );
        setWorkoutData(updatedWorkoutData);
      } catch (error) {
        console.error("Failed to load workout data", error);
      }
    };

    loadWorkoutData();
  }, [session]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDayPress = (dayItem: { day: string; workout: string }) => {
    navigation.navigate("WorkoutDay", { day: dayItem.day, workout: dayItem.workout });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ThemedText style={styles.welcomeText}>
            Welcome, {user?.name ? user.name.split(" ")[0] : "User"}
          </ThemedText>
          <HelloWave/>
        </View>
        <View style={styles.headerRight}>
          <Image source={DEFAULT_PROFILE_PIC} style={styles.profilePic} />
        </View>
      </View>

      {/* Subheader Section */}
      <View style={styles.subHeader}>
        <ThemedText type="subtitle">Your Current Split</ThemedText>
        <View style={styles.subHeaderDate}>
          <ThemedText type="default">{formattedDate}</ThemedText>
        </View>
      </View>

      {/* Workout Split List */}
      <FlatList
        data={workoutData}
        keyExtractor={(item) => item.day}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleDayPress(item)}>
            <ThemedText type="title" style={styles.cardTitle}>
              {item.day}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>{item.workout}</ThemedText>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.cardList}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F8FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  headerRight: {
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subHeader: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  subHeaderDate: {
    fontSize: 16,
    color: "#888",
    marginBottom: 1,
    marginTop: 1,
  },
  cardList: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
});
