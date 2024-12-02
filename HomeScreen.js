import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  // Navigate to the "AddBook" screen when clicked
  const handleAddBook = () => {
    navigation.navigate("AddBook");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Book Recommender App</Text>
      <Text style={styles.subtitle}>What would you like to do?</Text>
      {/* Button to add a book */}
      <Button title="Add a Book I'm Reading" onPress={handleAddBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;
