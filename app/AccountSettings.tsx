// app/(tabs)/AccountSettings.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootStackParamList } from '@/types/navigation'; // Import your navigation types

export default function AccountSettingsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Use the navigation types

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Account Settings</ThemedText>
      {/* Placeholder */}
      <ThemedText style={styles.placeholder}>
        Update your profile details, change your password, or modify other account settings.
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
