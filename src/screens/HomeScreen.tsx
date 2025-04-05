import React from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Platform } from 'react-native';
import { Button, Text, Surface, useTheme, TextInput, Menu } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const CONTENT_PADDING = SCREEN_WIDTH < 375 ? 12 : 20;
const IS_SMALL_DEVICE = SCREEN_WIDTH < 375;

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
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
  { icon: 'music', label: 'Pop' },
  { icon: 'guitar-electric', label: 'Rock' },
  { icon: 'music-note', label: 'Hip Hop' },
  { icon: 'music-clef-treble', label: 'Jazz' },
  { icon: 'guitar-acoustic', label: 'Country' },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const [songStyle, setSongStyle] = React.useState('');
  const [songStyleLabel, setSongStyleLabel] = React.useState('Select a style');
  const [lyricsTheme, setLyricsTheme] = React.useState('');
  const [menuVisible, setMenuVisible] = React.useState(false);

  const handleStyleSelect = (value: string, label: string) => {
    setSongStyle(value);
    setSongStyleLabel(label);
    setMenuVisible(false);
  };

  return (
    <ImageBackground 
      source={require('../../assets/music-bg.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text variant="displaySmall" style={styles.title}>
            Discover your next song
          </Text>
          
          <Text variant="headlineSmall" style={styles.subtitle}>
            Turn your ideas into music
          </Text>

          <Surface style={styles.searchContainer} elevation={4}>
            <View style={styles.inputsContainer}>
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
                placeholder="Enter lyrics theme..."
                value={lyricsTheme}
                onChangeText={setLyricsTheme}
                style={styles.searchInput}
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="#6200ee"
                label="Lyrics Theme"
                placeholderTextColor="#666666"
                theme={{
                  colors: {
                    text: '#000000',
                    placeholder: '#666666',
                    onSurfaceVariant: '#000000',
                  },
                }}
              />
            </View>
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate('Generate', { 
                  songStyle: songStyle,
                  lyricsTheme: lyricsTheme.trim()
                });
              }}
              style={styles.searchButton}
            >
              Create Song
            </Button>
          </Surface>

          <View style={styles.genreContainer}>
            {GENRES.map((genre, index) => (
              <View key={index} style={styles.genreItem}>
                <Surface style={styles.iconContainer} elevation={2}>
                  <Icon name={genre.icon} size={24} color="#6200ee" />
                </Surface>
                <Text style={styles.genreLabel}>{genre.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: CONTENT_PADDING,
    paddingVertical: Platform.select({ ios: 40, android: 20 }),
  },
  title: {
    color: '#ffffff',
    marginBottom: IS_SMALL_DEVICE ? 4 : 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: IS_SMALL_DEVICE ? 28 : 36,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: '#ffffff',
    marginBottom: IS_SMALL_DEVICE ? 24 : 40,
    textAlign: 'center',
    opacity: 1,
    fontSize: IS_SMALL_DEVICE ? 18 : 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  searchContainer: {
    width: '100%',
    maxWidth: Math.min(600, SCREEN_WIDTH - 2 * CONTENT_PADDING),
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: CONTENT_PADDING,
    alignItems: 'center',
    gap: IS_SMALL_DEVICE ? 12 : 16,
    marginHorizontal: CONTENT_PADDING,
  },
  inputsContainer: {
    width: '100%',
    gap: IS_SMALL_DEVICE ? 8 : 12,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  styleButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#ffffff',
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
  searchButton: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingHorizontal: CONTENT_PADDING,
    width: '100%',
  },
  genreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: IS_SMALL_DEVICE ? 40 : 60,
    gap: IS_SMALL_DEVICE ? 20 : 32,
    paddingHorizontal: CONTENT_PADDING,
  },
  genreItem: {
    alignItems: 'center',
    width: IS_SMALL_DEVICE ? 64 : 80,
  },
  iconContainer: {
    width: IS_SMALL_DEVICE ? 48 : 64,
    height: IS_SMALL_DEVICE ? 48 : 64,
    borderRadius: IS_SMALL_DEVICE ? 16 : 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: IS_SMALL_DEVICE ? 4 : 8,
  },
  genreLabel: {
    color: '#ffffff',
    fontSize: IS_SMALL_DEVICE ? 12 : 14,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
}); 