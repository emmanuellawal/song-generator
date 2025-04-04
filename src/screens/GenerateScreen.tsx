import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, TextInput, SegmentedButtons } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { generateSong } from '../services/songService';

type GenerateScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

const GENRES = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Rap', value: 'rap' },
  { label: 'R&B', value: 'rnb' },
  { label: 'Country', value: 'country' },
];

export default function GenerateScreen({ navigation }: GenerateScreenProps) {
  const [theme, setTheme] = useState('');
  const [genre, setGenre] = useState('pop');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('Please enter a theme for your song');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await generateSong(theme, genre);
      navigation.navigate('Result', { song: result });
    } catch (err) {
      setError('Failed to generate song. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Create Your Song
      </Text>

      <TextInput
        label="Song Theme"
        value={theme}
        onChangeText={setTheme}
        style={styles.input}
        multiline
        numberOfLines={3}
        placeholder="Enter the theme or idea for your song..."
      />

      <Text variant="titleMedium" style={styles.label}>
        Select Genre
      </Text>
      <SegmentedButtons
        value={genre}
        onValueChange={setGenre}
        buttons={GENRES}
        style={styles.genreButtons}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Button
        mode="contained"
        onPress={handleGenerate}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Generate Song
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  genreButtons: {
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
}); 