import React from "react";
import { produce } from "immer";

const person = {
    name: "Alice",
    age: 25,
    address: {
        city: "Wonderland",
        zip: "12345",
    },
};

const ReadMore: React.FC = () => {
    const updatedPerson = produce(person, (draft) => {
        draft.age = 26;
        draft.name = "Bob";
    });
    // Current Output

    console.log("Current", person);
    // Update Output

    console.log("Immer ", updatedPerson);

    return <div>ReadMore</div>;
};

export default ReadMore;
