// src/components/TODOList.jsx
import React from "react";
function TODOList({ todos, setTodos }) {
  return (
    <ol className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => (
          <Item key={index} item={item} setTodos={setTodos} />
        ))
      ) : (
        <p>Seems lonely in here, what are you up to?</p>
      )}
    </ol>
  );
}
function Item({ item, setTodos }) {

  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
    console.log(item.is_completed);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
  };

  const handleInpuSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  React.useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // position the cursor at the end of the text
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  return (
    <li id={item?.id} className="todo_item" >

      {editing ? (
        <form className="edit-form" onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>

          <button className="todo_items_left" onClick={completeTodo}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              {/* Círculo de borde */}
              <circle cx="12" cy="12" r="10" fill="none" stroke="#22C55E" strokeWidth="2" />
              {/* Círculo de relleno */}
              <circle cx="12" cy="12" r="9" fill={item.is_completed ? "#22C55E" : "transparent"} />
            </svg>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
              {item?.title}
            </p>
          </button>
          <div className="todo_items_right">
          <button onClick={handleEdit} className="edit-button">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.2 4.81a1.19 1.19 0 0 0-1.69 0l-11 11L2 20l5.19-1 11-11a1.19 1.19 0 0 0 0-1.69z"/>
                </svg>
              </span>
            </button>
            <button onClick={handleDelete} className="delete-button">
              <span className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm7.5-9h1v9h-1v-9zm-3 0h1v9h-1v-9zm7-5V4H7v1H3v2h18V5h-4z"/>
                </svg>
              </span>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TODOList;
