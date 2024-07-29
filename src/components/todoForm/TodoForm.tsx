import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";

interface TodoFormProps {
    addTodos: (text: string) => void;
    editTodo: Todo | null;
    updateTodo: (id: number, newText: string) => void;
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
    addTodos,
    editTodo,
    updateTodo,
}) => {
    const [input, setInput] = useState("");

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [editTodo]);

    const handleSubmit = () => {
        if (editTodo) {
            updateTodo(editTodo.id, input);
        } else {
            if (input.trim()) {
                addTodos(input);
            }
        }
        setInput("");
    };

    return (
        <div className="relative flex w-full max-w-[24rem]">
            <Input
                type="text"
                label="Add Item"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button
                size="sm"
                color={input ? "gray" : "blue-gray"}
                disabled={!input}
                className="!absolute right-1 top-1 rounded"
                onClick={handleSubmit}
            >
                {editTodo ? "Update" : "Add"}
            </Button>
        </div>
    );
};

export default TodoForm;
