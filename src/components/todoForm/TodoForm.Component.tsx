import React, { useEffect, useState, useRef } from "react";
import TodoForm from "./TodoForm";
import TodoLists from "./TodoLists.tsx";
import axios from "axios";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

const BASE_URL = "http://localhost:5000";

const TodoFormComponent: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getTodos = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/tasks`);
                setTodos(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        getTodos();
    }, []);

    const addTodo = async (title: string) => {
        const newTodo = { id: Date.now().toString(), title, completed: false };
        try {
            setLoading(true);
            const res = await axios.post(`${BASE_URL}/tasks`, newTodo);
            setTodos((prevTodo) => [...prevTodo, res.data]);
            setEditTodo(null);
            setLoading(false);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const deleteTodo = (id: string) => {
        try {
            setLoading(true);
            axios.delete(`${BASE_URL}/tasks/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const toggleComplete = (id: string) => {
        try {
            setLoading(true);
            const todo = todos.find((todo) => todo.id === id);
            if (todo) {
                axios.put(`${BASE_URL}/tasks/${id}`, {
                    ...todo,
                    completed: !todo.completed,
                });
                setTodos(
                    todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    )
                );
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const editTodoById = (id: string) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        if (todoToEdit) {
            setEditTodo(todoToEdit);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const updateTodo = (id: string, newText: string) => {
        const toDosUpdate = todos.find((todo) => todo.id === id);
        if (toDosUpdate) {
            const updatedTodo = { ...toDosUpdate, title: newText };

            axios
                .put(`${BASE_URL}/tasks/${id}`, updatedTodo)
                .then((response) => {
                    setTodos(
                        todos.map((todo) =>
                            todo.id === id ? response.data : todo
                        )
                    );
                    setEditTodo(null);
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                })
                .catch((error) => console.error("Error updating task:", error));
        }
    };

    return (
        <div className="flex justify-center">
            <div>
                <h1 className="font-bold text-5xl text-center p-5">TodoList</h1>
                <TodoForm
                    inputRef={inputRef}
                    addTodos={addTodo}
                    editTodo={editTodo}
                    updateTodo={updateTodo}
                />
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <TodoLists
                        todos={todos}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editById={editTodoById}
                    />
                )}
            </div>
        </div>
    );
};

export default TodoFormComponent;
