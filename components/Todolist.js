import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useStore from "./Store";

const ToDoList = () => {
  const { todos, completedTodos, addTodo, deleteTodo, editTodo, markAsDone } = useStore();
  const [todo, setTodo] = useState({
    todo: "",
    name: "",
    schoolId: "",
    sectionCode: "",
    courseDescription: "",
    courseName: "",
    academicYear: "",
    idPicture: "",
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (name, value) => {
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitTodo = () => {
    if (!todo.todo.trim()) {
      // Prevent adding empty todos
      return;
    }
    if (editId) {
      editTodo({
        ...todo,
        id: editId,
      });
      setEditId(null);
    } else {
      addTodo({
        ...todo,
        id: Date.now().toString(), // Using timestamp as unique id
      });
    }
    clearForm();
  };

  const clearForm = () => {
    setTodo({
      todo: "",
      name: "",
      schoolId: "",
      sectionCode: "",
      courseDescription: "",
      courseName: "",
      academicYear: "",
      idPicture: "",
    });
  };

  const handleEdit = (item) => {
    setTodo(item);
    setEditId(item.id);
  };

  const handleDone = (id) => {
    markAsDone(id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task"
        placeholderTextColor="#1E0342"
        value={todo.todo}
        onChangeText={(text) => handleInputChange("todo", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        placeholderTextColor="#1E0342"
        value={todo.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Complete Name"
        placeholderTextColor="#1E0342"
        value={todo.schoolId}
        onChangeText={(text) => handleInputChange("schoolId", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Student ID"
        placeholderTextColor="#1E0342"
        value={todo.sectionCode}
        onChangeText={(text) => handleInputChange("sectionCode", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Course"
        placeholderTextColor="#1E0342"
        value={todo.courseDescription}
        onChangeText={(text) => handleInputChange("courseDescription", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Academic Year"
        placeholderTextColor="#1E0342"
        value={todo.courseName}
        onChangeText={(text) => handleInputChange("courseName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        placeholderTextColor="#1E0342"
        value={todo.academicYear}
        onChangeText={(text) => handleInputChange("academicYear", text)}
      />
      {/* Add more TextInput components for other fields if needed */}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1E0342" }]}
        onPress={submitTodo}
      >
        <Text style={styles.buttonText}>{editId ? "Update" : "Add"}</Text>
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* Render active task item */}
            <TouchableOpacity onPress={() => handleDone(item.id)}>
              <Text>{item.todo}</Text>
            </TouchableOpacity>
            <Text>{item.name}</Text>
            <Text>{item.schoolId}</Text>
            <Text>{item.sectionCode}</Text>
            <Text>{item.courseDescription}</Text>
            <Text>{item.courseName}</Text>
            <Text>{item.academicYear}</Text>
            {!item.completed && (
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#1E0342" }]}
                  title="Edit"
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#1E0342" }]}
                  title="Delete"
                  onPress={() => deleteTodo(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#1E0342" }]}
                  title="Done"
                  onPress={() => handleDone(item.id)}
                >
                  <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#0d5c63", // Add the backgroundColor property here
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 80, // Adjust width to fit your layout
    alignItems: "center",
  },
  buttonText: {
    color: "#e7f9a9",
    fontSize: 16,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default ToDoList;
