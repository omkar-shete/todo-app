import { useEffect, useState } from "react";
import Todo from "./Todo";

//
import "./app.css";

//MaterialUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

//firebase
import db from "./firebase";
import firebase from "firebase/compat/app";
// import 'firebase/compat/firestore';
// import { Timestamp } from "firebase/firestore";
// import { getFirestore } from "firebase/firestore";

//
// ---------------------------------------------
function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodoInput();
  }, []);
  //

  const getTodoInput = () => {
    db.collection("todo-items").orderBy('timestamp','desc').onSnapshot((snap) => {
      setTodoList(snap.docs.map((doc) => (//returns object
      {
        todoId: doc.id,
        todoText: doc.data().singleTodoInput,
        isDone: doc.data().isDone 
      })
      ));
    });
  };
  //

  const addTodoInput = (e) => {
    e.preventDefault(); //prevents refrsh
    db.collection("todo-items").add({
      isDone: false,
      singleTodoInput: todoInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setTodoInput("");
  };

  //
  // --------RETURN--------
  return (
    <div className="App">
      <h1>ToDo App</h1>
      
      {/* INPUT */}
      <form onSubmit={addTodoInput}>
        <TextField
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          id="outlined-basic"
          label="Write a todo here"
          variant="outlined"
          // className="todoTextField"
          style={{ width: "70vw", maxWidth: "500px", margin:"16px 8px 8px" }}
        />

        <Button 
          type="submit" 
          disabled={!todoInput} 
          variant="contained" 
          size="large" 
          // className="addTodoBtn" 
          style={{margin:"24px 4px 0"}}
          >
          ADD
        </Button>
      </form>

      {/* TODOLIST  */}
      <div   
        // className="todoList"
        style={{ width: "90vw", maxWidth: "600px", margin:"8px"}}
        >
        {todoList.map((todoObj) => (
          <Todo 
            todoText={todoObj.todoText} 
            todoId={todoObj.todoId} 
            isDone={todoObj.isDone} 
            key={todoObj.todoId}
            />
        ))}
      </div>
    </div>
  );
}

export default App;
