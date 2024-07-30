import { useState } from "react";
import React from "react";
import TodoForm from "./components/todoForm/TodoForm.tsx";
import TodoLists from "./components/todoForm/TodoLists.tsx";
import { dataTodos } from "./components/data/data.ts";
import { produce } from "immer";
import SignUpForm from "./components/signUpForm/SignUpForm.tsx";
import SignUpReactHookForm from "./components/signUpForm/SignUpReactHookForm.tsx";
import SignUpRsv from "./components/signUpForm/SignUpRsv.tsx";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    email: string;
    password: string;
}

const App: React.FC = () => {
    // @ts-ignore
    const [todos, setTodos] = useState<Todo[]>(dataTodos);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    const [isLogin, setIsLogin] = useState<boolean>(false);

    // toDoList
    const addTodo = (title: string) => {
        const newTodo = { id: Date.now(), title, completed: false };
        const nextTodo = produce(todos, (draft) => {
            // @ts-ignore
            draft.push(newTodo);
        });
        setTodos(nextTodo);
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    };

    const editTodoById = (id: number) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        if (todoToEdit) {
            setEditTodo(todoToEdit);
        }
    };

    const updateTodo = (id: number, newText: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title: newText } : todo
            )
        );
        setEditTodo(null);
    };

    console.log(isLogin);

    return (
        <>
            {isLogin ? (
                <div className="flex justify-center">
                    <div>
                        <h1 className="font-bold text-5xl text-center p-5">
                            TodoList
                        </h1>
                        <TodoForm
                            addTodos={addTodo}
                            editTodo={editTodo}
                            updateTodo={updateTodo}
                        />
                        <TodoLists
                            todos={todos}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editById={editTodoById}
                        />
                    </div>
                </div>
            ) : (
                // @ts-ignore
                // <SignUpForm setIsLogin={setIsLogin} />
                // <SignUpReactHookForm setIsLogin={setIsLogin} />
                <SignUpRsv setIsLogin={setIsLogin} />
            )}
        </>
    );
};

export default App;
