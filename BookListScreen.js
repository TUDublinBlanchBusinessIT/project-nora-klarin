import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Rating } from "react-native-ratings";
import { useFocusEffect } from "@react-navigation/native";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  // Function to fetch books from Firestore
  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      setBooks(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } catch (error) {
      console.error("Error fetching books:", error);
      Alert.alert("Error", "Failed to fetch books.");
    }
  };

  // Refresh data when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchBooks();
    }, [])
  );

  // Function to delete a book
  const handleDelete = async (bookId) => {
    try {
      const updatedBookList = books.filter((book) => book.id !== bookId);
      setBooks(updatedBookList); // Update the local state optimistically
      await deleteDoc(doc(db, "books", bookId)); // Delete from Firestore
      Alert.alert("Success", "Book deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete the book.");
    }
  };

  // Render individual book items
  const renderBookItem = ({ item }) => (
    <Card style={styles.card}>
<Card.Content>
  <Title>{item.title}</Title>
  <Paragraph>Author: {item.author}</Paragraph>
  <Paragraph>Genre: {item.genre}</Paragraph>
  <View style={styles.ratingContainer}>
    <Text style={styles.ratingLabel}>Rating:</Text>
    <Rating
      type="star"
      readonly
      startingValue={item.rating}
      imageSize={25}
      style={styles.rating}
    />
  </View>
</Card.Content>
      <Card.Actions>
        <Button
          onPress={() => handleDelete(item.id)}
          icon="delete"
          mode="text"
        >
          Delete
        </Button>
        <Button
          onPress={() =>
            navigation.navigate("Edit", {
              bookId: item.id,
              currentTitle: item.title,
              currentAuthor: item.author,
              currentGenre: item.genre,
              currentRating: item.rating,
            })
          }
          icon="pencil"
          mode="text"
        >
          Edit
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book List</Text>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No books found.</Text>
        }
      />
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
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  ratingContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center", 
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  rating: {
    marginVertical: 5,
  },  
});
