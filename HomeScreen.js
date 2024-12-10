import React from "react";
import { View, Text, StyleSheet } from "react-native";  // Removed Button from here
import { Button, Card } from "react-native-paper";  // Keep Button from react-native-paper
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {

  const handleAddBook = () => {
    navigation.navigate("Add Book");
  };

  const handleViewList = () => {
    navigation.navigate("Book List");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Book App</Text>

      {/* Card for adding a book */}
      <Card style={styles.card}>
        <Card.Content>
          <Text>Start adding books to your list</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={handleAddBook}
            icon="book-plus"
          >
            Add Book
          </Button>
        </Card.Actions>
      </Card>

      {/* Card for viewing the book list */}
      <Card style={styles.card}>
        <Card.Content>
          <Text>View your book list</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={handleViewList}
            icon="view-list"
          >
            View List
          </Button>
        </Card.Actions>
      </Card>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    marginBottom: 15,
  },
});
