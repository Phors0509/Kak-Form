import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
interface TodoFormProps {
    addTodos: (text: string) => void;
    editTodo: Todo | null;
    updateTodo: (id: string, newText: string) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
    addTodos,
    editTodo,
    updateTodo,
    inputRef,
}) => {
    const [input, setInput] = useState("");

    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [editTodo]);

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            if (editTodo) {
                updateTodo(editTodo.id, input);
            } else {
                addTodos(input);
            }
        } catch (error) {
            console.log(error);
        }
        setInput("");
    };

    const handleClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="relative flex w-full max-w-[24rem]">
            <form onSubmit={handleSubmit}>
                <Input
                    ref={inputRef}
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
                    onClick={handleClick}
                    type="submit"
                >
                    {editTodo ? "Update" : "Add"}
                </Button>
            </form>
        </div>
    );
};

export default TodoForm;
