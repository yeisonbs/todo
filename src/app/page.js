// src/app/page.js
"use client";
import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Form from "@/app/components/Form";
import Header from "@/app/components/Header";
import TODOHero from "@/app/components/TODOHero";
import TODOList from "@/app/components/TODOList";
function Home() {
  const [todos, setTodos] = React.useState([]);
  const todos_completed = todos.filter(
    (todo) => todo.is_completed === true
  ).length;
  const total_todos = todos.length;
  
  return (
    <div className="wrapper">
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Form setTodos={setTodos} />
      <TODOList todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default Home;