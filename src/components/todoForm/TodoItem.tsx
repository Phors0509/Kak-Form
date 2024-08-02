import React from "react";
import { Button, Checkbox, IconButton } from "@material-tailwind/react";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoItemProps {
    item: Todo;
    deleteTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
    editById: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
    item,
    deleteTodo,
    toggleComplete,
    editById,
}) => {
    return (
        <div className={"mx-auto flex justify-between"}>
            <Checkbox
                label={
                    <span
                        className={item.completed ? "line-through" : ""}
                        onClick={() => toggleComplete(item.id)}
                    >
                        {item.title}
                    </span>
                }
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
            />

            {!item.completed ? (
                <IconButton onClick={() => editById(item.id)}>Edit</IconButton>
            ) : (
                <IconButton onClick={() => editById(item.id)} disabled>
                    Edit
                </IconButton>
            )}
            <Button onClick={() => deleteTodo(item.id)}>Delete</Button>
        </div>
    );
};

export default TodoItem;
