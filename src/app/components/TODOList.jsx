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
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.2 4.81a1.19 1.19 0 0 0-1.69 0l-11 11L2 20l5.19-1 11-11a1.19 1.19 0 0 0 0-1.69z" />
              </svg>
            </button>
            <button>
              <span className="visually-hidden">Delete</span>
              <svg>
                <path d="" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TODOList;
