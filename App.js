import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import AddBookScreen from './AddBookScreen';
import BookListScreen from './BookListScreen';
import HomeScreen from './HomeScreen'


const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Book" component={AddBookScreen} />
        <Stack.Screen name="Book List" component={BookListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}