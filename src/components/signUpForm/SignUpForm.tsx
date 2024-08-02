import React, { ChangeEvent, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";

interface SignUpProps {
    email: string;
    password: string;
    confirmPassword: string;
    setIsLogin: (isLogin: boolean) => void;
}

interface InputFormProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
}

const signUpForm = {
    email: "",
    password: "",
    confirmPassword: "",
};

const InputForm: React.FC<InputFormProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
}) => {
    return (
        <Input
            label={label}
            size="lg"
            onChange={onChange}
            name={name}
            type={type}
            value={value}
            error={error}
        />
    );
};

const SignUpForm: React.FC<SignUpProps> = ({ setIsLogin }) => {
    const [signUp, setSignUp] = useState(signUpForm);

    // const [error, setError] = useState<Record<string, string>>();
    const [error, setError] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const [isSumit, setIsSubmit] = useState<boolean>(false);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUp({ ...signUp, [name]: value });
    };

    const validate = () => {
        const newError: {
            email?: string;
            password?: string;
            confirmPassword?: string;
        } = {};
        if (!/\S+@\S+\.\S+/.test(signUp.email)) {
            newError.email = "Email is not in correct format";
        }
        if (signUp.password !== signUp.confirmPassword) {
            newError.confirmPassword = "Confirm Password do not match";
        }
        return newError;
    };

    const handleSumbit = () => {
        const validationError = validate();
        if (Object.keys(validationError).length > 0) {
            setError(validationError);
        } else {
            setIsSubmit(true);
            setTimeout(() => {
                setIsSubmit(false);
                setIsLogin(true);
            }, 2000);
        }
    };

    return (
        <>
            <div className="flex justify-center">
                <Card className="w-96" color="transparent" shadow={true}>
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            Sign In
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <InputForm
                            label="Email"
                            onChange={handleOnChange}
                            name="email"
                            type="email"
                            value={signUp.email}
                            error={error.email ? true : false}
                        />
                        {error.email && (
                            <Typography color="red">{error.email}</Typography>
                        )}
                        <InputForm
                            label="Password"
                            onChange={handleOnChange}
                            name="password"
                            type="password"
                            value={signUp.password}
                        />

                        <InputForm
                            label="Confirm Password"
                            onChange={handleOnChange}
                            name="confirmPassword"
                            type="password"
                            value={signUp.confirmPassword}
                            error={error.confirmPassword ? true : false}
                        />
                        {error.confirmPassword && (
                            <Typography color="red">
                                {error.confirmPassword}
                            </Typography>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            fullWidth
                            onClick={() => handleSumbit()}
                        >
                            {isSumit ? "Submitting..." : "Sign Up"}
                        </Button>
                        <Typography
                            variant="small"
                            className="mt-6 flex justify-center"
                        >
                            Don&apos;t have an account?
                            <Typography
                                as="a"
                                href="#signup"
                                variant="small"
                                color="blue-gray"
                                className="ml-1 font-bold"
                            >
                                Sign up
                            </Typography>
                        </Typography>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
};
export default SignUpForm;
