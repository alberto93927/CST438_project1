import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";
import { TextStyle, ViewStyle } from "react-native";

export default function FlexZoneHeader() {
  return (
    <ThemedView style={$container}>
        <ThemedText style={$heading} type="title">FlexZone:</ThemedText>
        <ThemedText style={$subheading} type="subtitle">the fitness app</ThemedText>
    </ThemedView>
  );
}

const $container: ViewStyle = {
    width: "100%",
    marginTop: 16,
};

const $heading: TextStyle = {
    fontWeight: "bold",
    textAlign: "center",
    color: 'green'
};

const $subheading: TextStyle = {
    fontSize: 18,
    textAlign: "center",
    color: 'green'
};