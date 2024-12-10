import React, { useState } from "react"; // Ensure useState is imported
import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { Rating } from "react-native-ratings";
import { doc, updateDoc } from "firebase/firestore";
import { TouchableOpacity } from "react-native";
import { db } from "./firebaseConfig"; // Ensure Firebase is configured properly

export default function EditBookScreen({ route = {}, navigation }) {
  const {
    bookId = "",
    currentTitle = "",
    currentAuthor = "",
    currentGenre = "",
    currentRating = 0,
  } = route.params || {};

  const [bookTitle, setBookTitle] = useState(currentTitle);
  const [bookAuthor, setBookAuthor] = useState(currentAuthor);
  const [bookGenre, setBookGenre] = useState(currentGenre);
  const [bookRating, setBookRating] = useState(currentRating);

  const saveData = async () => {
    if (bookAuthor.trim() && bookTitle.trim() && bookGenre.trim() && bookRating > 0) {
      try {
        const bookRef = doc(db, "books", bookId);

        // Update the book in Firestore
        await updateDoc(bookRef, {
          author: bookAuthor,
          title: bookTitle,
          genre: bookGenre,
          rating: bookRating,
        });

        Alert.alert("Changes Saved", "Your book details have been successfully updated!");
        navigation.goBack(); // Go back after saving
      } catch (err) {
        console.error("Error updating book:", err);
        Alert.alert("Error", "Failed to update book.");
      }
    } else {
      Alert.alert("Validation Error", "Please fill in all fields and provide a rating.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Book Details</Text>
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
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
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
  saveButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
