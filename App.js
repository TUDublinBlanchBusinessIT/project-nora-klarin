import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import AddBookScreen from './AddBookScreen';
import BookListScreen from './BookListScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();

export default function App() {
  const [books, setBooks] = useState([]);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={(props) => (
            <HomeScreen {...props} books={books} setBooks={setBooks} />
          )}
        />
        <Stack.Screen
          name="Add Book"
          component={(props) => (
            <AddBookScreen {...props} books={books} setBooks={setBooks} />
          )}
        />
        <Stack.Screen
          name="Book List"
          component={(props) => (
            <BookListScreen {...props} books={books} setBooks={setBooks} />
          )}
        />   
      </Stack.Navigator>
    </NavigationContainer>
  );
}

