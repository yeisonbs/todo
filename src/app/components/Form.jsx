// src/components/Form.jsx

import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
function Form({ setTodos }) {
    const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error

    const handleSubmit = (event) => {
        event.preventDefault();
        const value = event.target.todo.value.trim();
        if (value.length === 0) {
            setErrorMessage("Please enter a valid todo item."); // Establece el mensaje de error si el campo está vacío
            return;
        }
        setTodos((prevTodos) => [
            ...prevTodos,
            { title: value, id: uuidv4(), is_completed: false },]);
        event.target.reset();
        setErrorMessage(""); // Borra el mensaje de error después de enviar el formulario con éxito

    };

    // render the form
    return (

        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="todo"  >
                <input
                    type="text"
                    name="todo"
                    id="todo"
                    placeholder="Write your next task"
                />
                {errorMessage && <span className="error-message">{errorMessage}</span>} {/* Muestra el mensaje de error si existe */}
            </label>

           
            <button type="submit">
                <span className="visually-hidden">Submit</span>
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12 5v14M5 12h14"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
   
           
            
        </form>

    );
}
export default Form;
