// src/components/TODOList.jsx

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

  return (
    <li id={item?.id} className="todo_item" onClick={completeTodo}>
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
        <button>
          <span className="visually-hidden">Edit</span>
          <svg>
            <path d="" />
          </svg>
        </button>
        <button>
          <span className="visually-hidden">Delete</span>
          <svg>
            <path d="" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default TODOList;
