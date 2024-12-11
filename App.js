import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import stack navigator
import AddBookScreen from './AddBookScreen';
import BookListScreen from './BookListScreen';
import HomeScreen from './HomeScreen';
import EditBookScreen from './EditBookScreen'; // Import the EditBookScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create the stack navigator

// Stack navigator for screens that are not part of the bottom tab
function BookListStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Book List" component={BookListScreen} />
      <Stack.Screen name="Edit" component={EditBookScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#f5f5f5" },
          tabBarActiveTintColor: "#007BFF",
          tabBarInactiveTintColor: "#555",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add Book" component={AddBookScreen} />
        <Tab.Screen name="Book List" component={BookListStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
