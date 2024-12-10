import React, { useEffect, useState } from 'react'; // Added useEffect and useState
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddBookScreen from './AddBookScreen';
import BookListScreen from './BookListScreen';
import HomeScreen from './HomeScreen';
import EditBookScreen from './EditBookScreen';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Book" component={AddBookScreen} />
        <Stack.Screen name="Book List" component={BookListScreen} />
        <Stack.Screen name="Edit" component={EditBookScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
