import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

type ResultScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, 'Result'>;
};

export default function ResultScreen({ navigation, route }: ResultScreenProps) {
  const { song } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        {song.title}
      </Text>

      <View style={styles.lyricsContainer}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Lyrics
        </Text>
        <Text style={styles.lyrics}>{song.lyrics}</Text>
      </View>

      {song.audioUrl && (
        <View style={styles.audioContainer}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Audio Preview
          </Text>
          {/* Add audio player component here */}
        </View>
      )}

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.button}
      >
        Create Another Song
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  lyricsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  lyrics: {
    lineHeight: 24,
  },
  audioContainer: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
}); 