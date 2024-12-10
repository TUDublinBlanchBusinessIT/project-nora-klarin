import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Rating } from "react-native-ratings";
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddBookScreen() {
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [bookRating, setBookRating] = useState(0);

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

  const saveData = async () => {
    if (bookAuthor.trim() && bookTitle.trim() && bookGenre.trim() && bookRating > 0) {
      try {
        await addDoc(collection(db, "books"), {
          author: bookAuthor,
          title: bookTitle,
          genre: bookGenre,
          rating: bookRating,
        });
        Alert.alert("Success", "Book added successfully!");
        setBookAuthor("");
        setBookTitle("");
        setBookGenre("");
        setBookRating(0);
      } catch (err) {
        console.error("Error adding document:", err);
        Alert.alert("Error", `Failed to add book: ${err.message}`);
      }
    } else {
      Alert.alert("Validation Error", "Please fill in all fields and provide a rating.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Book You're Reading</Text>
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={bookTitle}
        onChangeText={setBookTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Book Author"
        value={bookAuthor}
        onChangeText={setBookAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Book Genre"
        value={bookGenre}
        onChangeText={setBookGenre}
      />      
      <Text style={styles.label}>Rate this book:</Text>
      <Rating
        type="star"
        startingValue={bookRating}
        imageSize={30}
        onFinishRating={setBookRating} 
        style={{ marginBottom: 20 }}
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
});