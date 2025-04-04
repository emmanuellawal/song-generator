import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import GenerateScreen from './src/screens/GenerateScreen';
import ResultScreen from './src/screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Song Generator' }}
          />
          <Stack.Screen 
            name="Generate" 
            component={GenerateScreen} 
            options={{ title: 'Generate Song' }}
          />
          <Stack.Screen 
            name="Result" 
            component={ResultScreen} 
            options={{ title: 'Your Song' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
} 