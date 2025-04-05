import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';
import { Button, Text, TextInput, SegmentedButtons, Menu } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { generateSong } from '../services/songService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CONTENT_PADDING = SCREEN_WIDTH < 375 ? 12 : 20;
const IS_SMALL_DEVICE = SCREEN_WIDTH < 375;

type GenerateScreenProps = {
  navigation: NativeStackNavigationProp<any>;
  route: RouteProp<any, 'Generate'>;
};

const MUSIC_STYLES = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Hip Hop', value: 'hiphop' },
  { label: 'R&B', value: 'rnb' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Blues', value: 'blues' },
  { label: 'Classical', value: 'classical' },
  { label: 'Electronic', value: 'electronic' },
  { label: 'Folk', value: 'folk' },
  { label: 'Country', value: 'country' },
  { label: 'Latin', value: 'latin' },
  { label: 'Reggae', value: 'reggae' },
  { label: 'Metal', value: 'metal' },
  { label: 'Punk', value: 'punk' },
  { label: 'Soul', value: 'soul' },
  { label: 'Funk', value: 'funk' },
  { label: 'Gospel', value: 'gospel' },
  { label: 'Indie', value: 'indie' },
  { label: 'Alternative', value: 'alternative' },
  { label: 'EDM', value: 'edm' },
];

const GENRES = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Rap', value: 'rap' },
  { label: 'R&B', value: 'rnb' },
  { label: 'Country', value: 'country' },
];

export default function GenerateScreen({ navigation, route }: GenerateScreenProps) {
  const [songStyle, setSongStyle] = useState(route.params?.songStyle || '');
  const [songStyleLabel, setSongStyleLabel] = useState(() => {
    const style = MUSIC_STYLES.find(s => s.value === route.params?.songStyle);
    return style ? style.label : 'Select a style';
  });
  const [lyricsTheme, setLyricsTheme] = useState(route.params?.lyricsTheme || '');
  const [genre, setGenre] = useState('pop');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const handleStyleSelect = (value: string, label: string) => {
    setSongStyle(value);
    setSongStyleLabel(label);
    setMenuVisible(false);
  };

  const handleGenerate = async () => {
    if (!songStyle && !lyricsTheme.trim()) {
      setError('Please select a song style or enter a lyrics theme');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await generateSong(songStyle, lyricsTheme, genre);
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

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button
            mode="outlined"
            onPress={() => setMenuVisible(true)}
            style={styles.styleButton}
            contentStyle={styles.styleButtonContent}
            icon="music"
            textColor="#000000"
          >
            <Text numberOfLines={1} style={styles.buttonText}>
              {songStyleLabel}
            </Text>
          </Button>
        }
        contentStyle={[styles.menuContent, { backgroundColor: '#6200ee' }]}
        style={styles.menuContainer}
      >
        {MUSIC_STYLES.map((style) => (
          <Menu.Item
            key={style.value}
            onPress={() => handleStyleSelect(style.value, style.label)}
            title={style.label}
            titleStyle={styles.menuItemText}
            style={styles.menuItem}
          />
        ))}
      </Menu>

      <TextInput
        label="Lyrics Theme"
        value={lyricsTheme}
        onChangeText={setLyricsTheme}
        style={styles.input}
        multiline
        numberOfLines={2}
        placeholder="Enter the story or message theme..."
        placeholderTextColor="#666666"
        theme={{
          colors: {
            text: '#000000',
            placeholder: '#666666',
            onSurfaceVariant: '#000000',
          },
        }}
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
    padding: CONTENT_PADDING,
    backgroundColor: '#ffffff',
    minHeight: '100%',
  },
  title: {
    marginBottom: IS_SMALL_DEVICE ? 16 : 20,
    textAlign: 'center',
    fontSize: IS_SMALL_DEVICE ? 24 : 28,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  input: {
    marginBottom: IS_SMALL_DEVICE ? 16 : 20,
    backgroundColor: '#f5f5f5',
    fontSize: IS_SMALL_DEVICE ? 14 : 16,
    color: '#000000',
  },
  styleButton: {
    width: '100%',
    height: 48,
    marginBottom: IS_SMALL_DEVICE ? 16 : 20,
    backgroundColor: '#f5f5f5',
    borderColor: '#000000',
  },
  styleButtonContent: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 8,
    fontSize: IS_SMALL_DEVICE ? 14 : 16,
    color: '#000000',
  },
  menuContainer: {
    width: '100%',
    marginTop: 4,
  },
  menuContent: {
    maxHeight: 192, // Height of 4 items (48px each)
    width: '100%',
    marginLeft: -8, // Adjust for menu positioning
  },
  menuItem: {
    height: 48,
    justifyContent: 'center',
  },
  menuItemText: {
    color: '#ffffff',
    fontSize: IS_SMALL_DEVICE ? 14 : 16,
    marginLeft: -24, // Adjust text position
  },
  label: {
    marginBottom: IS_SMALL_DEVICE ? 8 : 10,
    fontSize: IS_SMALL_DEVICE ? 16 : 18,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  genreButtons: {
    marginBottom: IS_SMALL_DEVICE ? 16 : 20,
  },
  error: {
    color: '#d32f2f',
    marginBottom: IS_SMALL_DEVICE ? 16 : 20,
    textAlign: 'center',
    fontSize: IS_SMALL_DEVICE ? 14 : 16,
    fontWeight: '500',
  },
  button: {
    marginTop: IS_SMALL_DEVICE ? 16 : 20,
    backgroundColor: '#6200ee',
    height: Platform.select({ ios: 48, android: 40 }),
  },
}); 