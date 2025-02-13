import React from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/hooks/ctx";
import { router } from "expo-router";

import FlexZoneHeader from "@/components/FlexZoneHeader";

export default function AuthScreen() {
  const { signIn } = useSession();

  const handleSignIn = async () => {
    await signIn();
    router.replace("/");
  };

  return (
    <ThemedView style={styles.container}>
      <FlexZoneHeader />
      <ThemedView>
        <Button
          title="Sign In With Google"
          onPress={handleSignIn}
        />
      </ThemedView>
      <ThemedView>
        <ThemedText type="default">Group 8 - CST438</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
