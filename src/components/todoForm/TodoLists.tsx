import React from "react";
import TodoItem from "./TodoItem.tsx";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: number) => void;
    toggleComplete: (id: number) => void;
    editById: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    deleteTodo,
    toggleComplete,
    editById,
}) => {
    return (
        <>
            {todos.map((item) => (
                <TodoItem
                    key={item.id}
                    item={item}
                    deleteTodo={deleteTodo}
                    toggleComplete={toggleComplete}
                    editById={editById}
                />
            ))}
        </>
    );
};

export default TodoList;
