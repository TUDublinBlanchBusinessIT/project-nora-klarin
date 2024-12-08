import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";


export default function HomeScreen({ navigation }) {
  const handleAddBook = () => {
    navigation.navigate("AddBookScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CoverLover</Text>
      <Text style={styles.subtitle}>What would you like to do?</Text>
      <Button title="Add a Book I'm Reading" onPress={handleAddBook} />
    </View>
  );
}


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
  }})
