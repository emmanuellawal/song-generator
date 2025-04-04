import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Surface, useTheme } from 'react-native-paper';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Surface style={styles.contentContainer} elevation={0}>
        <Text variant="displaySmall" style={[styles.title, { color: theme.colors.primary }]}>
          Welcome to Song Generator
        </Text>
        
        <Text variant="headlineSmall" style={styles.subtitle}>
          Turn Your Ideas into Music
        </Text>

        <Text variant="bodyLarge" style={styles.description}>
          Create unique and personalized songs based on your theme and preferred genre. 
          Let AI help you bring your musical vision to life.
        </Text>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Generate')}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Start Creating Your Song
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.9,
  },
  description: {
    marginBottom: 48,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  button: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 8,
  },
  buttonContent: {
    height: 48,
  },
  buttonLabel: {
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: 'bold',
  },
}); 