import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddBookScreen from './AddBookScreen';
import BookListScreen from './BookListScreen';
import HomeScreen from './HomeScreen';
import EditBookScreen from './EditBookScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';


const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">        
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add Book" component={AddBookScreen} />
        <Stack.Screen name="Book List" component={BookListScreen} />
        <Stack.Screen name="EditBookScreen" component={EditBookScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}