import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Alert, ScrollView} from "react-native";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import { Rating } from "react-native-ratings";
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function BookListScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
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

    fetchBooks();
  }, []);
  const handleDelete = async (bookId) => {
    try {
      const updatedBookList = books.filter((book) => book.id !== bookId);
      setBooks(updatedBookList); 
      await deleteDoc(doc(db, "books", bookId)); 
    } catch (error) {
      console.error("Error deleting book:", error);
      Alert.alert("Error", "Failed to delete the book.");
    }
  };
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
        startingValue={item.rating}
        style={{ marginBottom: 10 }}
      />
      <Icon
        name="trash-bin"
        size={30}
        color="red"
        onPress={() => handleDelete(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book List</Text>
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
    elevation: 3,
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
