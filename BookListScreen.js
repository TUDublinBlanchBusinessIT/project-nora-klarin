import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { db } from "./firebaseConfig"; // Ensure firebaseConfig initializes Firestore
import { collection, getDocs } from "firebase/firestore";
import { Rating } from "react-native-ratings"; // To show star rating

export default function BookListScreen() {
  const [books, setBooks] = useState([]);

  // Fetch books from Firestore when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Get all documents from the 'books' collection
        const querySnapshot = await getDocs(collection(db, "books"));
        
        // Map the documents to an array of book data
        setBooks(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, // Document ID for uniqueness
          }))
        );
      } catch (error) {
        console.error("Error fetching books:", error);
        Alert.alert("Error", "Failed to fetch books.");
      }
    };

    fetchBooks();
  }, []); // Empty dependency array to run once when component mounts

  // Render each book item
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>Author: {item.author}</Text>
      <Text style={styles.bookGenre}>Genre: {item.genre}</Text>
      <Text style={styles.bookRating}>Rating:</Text>
      <Rating
        type="star"
        imageSize={20}
        readonly
        startingValue={item.rating} // Rating value from Firestore
        style={{ marginBottom: 10 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book List</Text>
      {/* FlatList to display books */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
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
  bookItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bookAuthor: {
    fontSize: 16,
    marginVertical: 5,
  },
  bookGenre: {
    fontSize: 16,
    marginVertical: 5,
  },
  bookRating: {
    fontSize: 16,
    marginVertical: 5,
  },
});
