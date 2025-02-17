import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpReactHookForm: React.FC = ({ setIsLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        setIsLogin(true);
    };

    return (
        <>
            <h1>HI</h1>
            <div className="flex justify-center">
                <Card className="w-96">
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
                        <Input
                            label="Email"
                            size="lg"
                            type="email"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-red-900">
                                This field is required
                            </span>
                        )}

                        <Input
                            label="Password"
                            size="lg"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-900">
                                This field is required
                            </span>
                        )}
                        <Input
                            label="Confirm Password"
                            size="lg"
                            type="password"
                            {...register("confirmPassword", { required: true })}
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-900">
                                This field is required
                            </span>
                        )}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            variant="gradient"
                            fullWidth
                            onClick={handleSubmit(onSubmit)}
                        >
                            Sign Up
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

export default SignUpReactHookForm;
