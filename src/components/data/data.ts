interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const dataTodos: Todo[] = [
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Finish homework', completed: false },
    { id: 3, title: 'Walk the dog', completed: false },
];

export { dataTodos };