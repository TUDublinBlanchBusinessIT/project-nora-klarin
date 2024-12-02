import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "./firebaseConfig"; // Ensure firebaseConfig initializes Firestore
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddBookScreen() {
  const [books, setBooks] = useState([]);
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");

  // Fetch books from Firestore on component mount
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
      }
    };

    fetchBooks();
  }, []);

  // Save book data to Firestore
  const saveData = async () => {
    if (bookAuthor.trim() && bookTitle.trim()) {
      try {
        await addDoc(collection(db, "books"), {
          author: bookAuthor,
          title: bookTitle,
        });
        Alert.alert("Success", "Book added successfully!");
        setBookAuthor(""); // Clear inputs
        setBookTitle("");
      } catch (err) {
        console.error("Error adding document:", err);
        Alert.alert("Error", `Failed to add book: ${err.message}`);
      }
    } else {
      Alert.alert("Validation Error", "Please enter both title and author.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Book You're Reading</Text>
      {/* Book Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={bookTitle}
        onChangeText={setBookTitle}
      />
      {/* Book Author Input */}
      <TextInput
        style={styles.input}
        placeholder="Book Author"
        value={bookAuthor}
        onChangeText={setBookAuthor}
      />
      <Button title="Add Book" onPress={saveData} />
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
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});