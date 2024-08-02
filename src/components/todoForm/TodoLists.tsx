import React from "react";
import TodoItem from "./TodoItem.tsx";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
    editById: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
    todos,
    deleteTodo,
    toggleComplete,
    editById,
}) => {
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.completed === b.completed) {
            return 0;
        } else if (a.completed) {
            return -1;
        } else {
            return 1;
        }
    });
    return (
        <>
            {sortedTodos.map((item) => (
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
