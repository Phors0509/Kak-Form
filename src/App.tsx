// import { useState } from "react";
import React from "react";
// import SignUpForm from "./components/signUpForm/SignUpForm.tsx";
// import SignUpReactHookForm from "./components/signUpForm/SignUpReactHookForm.tsx";
// import SignUpRsv from "./components/signUpForm/SignUpRsv.tsx";
import TodoFormComponent from "./components/todoForm/TodoForm.Component.tsx";

const App: React.FC = () => {
    // const [isLogin, setIsLogin] = useState<boolean>(false);
    // console.log(isLogin);

    return (
        <>
            <TodoFormComponent />

            {/* {isLogin ? (
                <TodoFormComponent />
            ) : (
                // <SignUpForm setIsLogin={setIsLogin} />
                // <SignUpReactHookForm setIsLogin={setIsLogin} />
                <SignUpRsv setIsLogin={setIsLogin} />
            )} */}
        </>
    );
};

export default App;
