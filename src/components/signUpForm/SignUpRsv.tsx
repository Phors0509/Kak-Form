import React, { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface SignUpProps {
    setIsLogin: (isLogin: boolean) => void;
}

const schema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required(),
    })
    .required();

const SignUpRsv: React.FC<SignUpProps> = ({ setIsLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: unknown) => {
        console.log(data);
        setIsLogin(true);
    };

    return (
        <>
            <h1>Schema Validation</h1>
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
                        <p className="text-orange-900">
                            {errors.email?.message}
                        </p>
                        <Input
                            label="Password"
                            size="lg"
                            type="password"
                            {...register("password", {
                                required: true,
                            })}
                        />

                        <p className="text-orange-900">
                            {errors.password?.message}
                        </p>

                        <Input
                            label="Confirm Password"
                            size="lg"
                            type="password"
                            {...register("confirmPassword", {
                                required: true,
                            })}
                        />
                        <p className="text-orange-900">
                            {errors.confirmPassword?.message}
                        </p>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            variant="gradient"
                            fullWidth
                            type="submit"
                            typeof="submit"
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

export default SignUpRsv;
