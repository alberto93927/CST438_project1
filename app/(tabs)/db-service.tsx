import * as SQLite from 'expo-sqlite';

import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, View, Text, FlatList } from 'react-native';
import { getExercises} from '../../api/wgerAPI';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Exercise } from '@/types/exercise';

export default function TabThreeScreen() {

}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 50,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  exerciseItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  categoryName: {
    fontSize: 18,
    color: 'black',
  },

  subExerciseName: {
    fontSize:16,
    color:'black',
    marginLeft: 10,
  },

});
