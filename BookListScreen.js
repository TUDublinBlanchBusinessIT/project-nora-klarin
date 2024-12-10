import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";
import { Card, Button, Title, Paragraph } from "react-native-paper"; // Import Card and other components
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

  const renderBookItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Author: {item.author}</Paragraph>
        <Paragraph>Genre: {item.genre}</Paragraph>
        <Paragraph>Rating:</Paragraph>
        <Rating
          type="star"
          imageSize={20}
          readonly
          startingValue={item.rating}
          style={{ marginBottom: 10 }}
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleDelete(item.id)} icon="trash-can">Delete</Button>
        <Button onPress={() => navigation.navigate('EditBook', { book: item })} icon="pencil">Edit</Button>
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
});
