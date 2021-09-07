import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Route, Switch } from "react-router-dom"

import About from "../pages/About"
import NotMatch from "../pages/NotMatch"

import Header from "./Header"
import Navbar from "./Navbar"
import InputTodo from "./InputTodo"
import TodosList from "./TodosList"

const TodoContainer = () => {
  function getInitialTodos() {
    const temp = localStorage.getItem("todos")
    const savedTodos = JSON.parse(temp)
    return savedTodos || []
  }

  const [todos, setTodos] = useState(getInitialTodos())

  const handleChange = id => {
    setTodos(prevState => 
      prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    )
  }

  const deleteTodo = id => {
    setTodos([
      ...todos.filter(todo => {
        return todo.id !== id;
      })
    ]);
  };

  const addTodo = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };

    setTodos([...todos, newTodo])
  }

  const updateTodo = (updatedTitle, id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      })
    )
  }

  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos)
      setTodos(loadedTodos)
  }, [setTodos])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])
    
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div className="container">
            <div className="inner">
              <Header />
              <InputTodo addTodoProps={addTodo} />
              <TodosList 
                todos={todos}
                handleChangeProps={handleChange}
                deleteTodoProps={deleteTodo} 
                updateTodoProps={updateTodo}
              />
            </div>
          </div>
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="*">
          <NotMatch />
        </Route>
      </Switch>
    </>
  );
}

export default TodoContainer