import React from "react";
import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import useProfile from "@/hooks/useProfile";
import { ProfilePic } from "@/components/ProfilePic";

export default function ProfileScreen() {
  const { signOut } = useSession();
  const { profile } = useProfile();
  console.log(profile);

  return (
    <ThemedView style={styles.container}>
      <ProfilePic style={styles.profilePic} />

      <ThemedText type="title" style={styles.username}>
        {profile?.user?.username}
      </ThemedText>

      <ThemedText type="subtitle" style={styles.email}>
        {profile?.user?.email}
      </ThemedText>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <ThemedText type="default" style={styles.buttonText}>
          Sign Out
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#888",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#888",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});