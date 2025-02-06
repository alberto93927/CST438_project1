import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import { useSession } from "@/hooks/ctx";
import { GoogleUser } from "@/types/user";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/navigation"; 

//deafult picture for now
const DEFAULT_PROFILE_PIC = require('@/assets/images/default-profile.png');

//static!! later replace with new API data
const workoutSplit = [
  { day: "Monday", workout: "Push day" },
  { day: "Tuesday", workout: "Pull day" },
  { day: "Wednesday", workout: "Leg day" },
  { day: "Thursday", workout: "Chest and back day" },
  { day: "Friday", workout: "Shoulders and Arms day" },
  { day: "Saturday", workout: "Leg day" },
  { day: "Sunday", workout: "Rest day" },
];

export default function HomeScreen() {
  const { session, signOut } = useSession();
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 

  useEffect(() => {
    if (session) {
      setUser(JSON.parse(session));
    }
  }, [session]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleDayPress = (dayItem: { day: string; workout: string }) => {
    navigation.navigate("WorkoutDay", { day: dayItem.day, workout: dayItem.workout });
  };

  const renderWorkoutCard = ({ item }: { item: { day: string; workout: string } }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleDayPress(item)}>
      <ThemedText type="subtitle" style={styles.cardTitle}>
        {item.day}
      </ThemedText>
      <ThemedText>{item.workout}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Welcome + Wave Animation */}
        <View style={styles.headerLeft}>
          <ThemedText type="title">Welcome, User</ThemedText>
          <HelloWave />
        </View>
        {/* User's first name + Profile Picture */}
        <TouchableOpacity style={styles.headerRight} onPress={toggleSidebar}>
          <ThemedText type="title">
            {user?.name ? user.name.split(" ")[0] : "User"}
          </ThemedText>
          <Image source={DEFAULT_PROFILE_PIC} style={styles.profilePic} />
        </TouchableOpacity>
      </View>

      {/* Fitness Homepage and Date */}
      <View style={styles.subHeader}>
        <ThemedText type="default">Fitness Homepage</ThemedText>
        <ThemedText type="default">{formattedDate}</ThemedText>
      </View>

      {/* Workout Split Cards */}
      <FlatList
        data={workoutSplit}
        keyExtractor={(item) => item.day}
        renderItem={renderWorkoutCard}
        contentContainerStyle={styles.cardList}
      />

      {/* Sidebar Menu */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSidebarOpen}
        onRequestClose={toggleSidebar}
      >
        <TouchableOpacity style={styles.sidebarOverlay} onPress={toggleSidebar}>
          <View style={styles.sidebar}>
            <ThemedText type="title" style={styles.sidebarTitle}>
              Account Menu
            </ThemedText>
            {/* Add additional sidebar buttons/options as needed */}
            <TouchableOpacity style={styles.sidebarButton} onPress={() => {
              // Navigate to an account settings screen, if available
              navigation.navigate("AccountSettings");
              toggleSidebar();
            }}>
              <ThemedText>Edit Profile</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarButton} onPress={signOut}>
              <ThemedText>Sign Out</ThemedText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  subHeader: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardList: {
    marginTop: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 2,
  },
  cardTitle: {
    marginBottom: 4,
  },

  sidebarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#fff",
    padding: 16,

  },
  sidebarTitle: {
    marginBottom: 16,
  },
  sidebarButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
