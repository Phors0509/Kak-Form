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
import {useForm, SubmitHandler} from "react-hook-form"

type Inputs = {
    email: string
    password: string
    confirmPassword: string
}

const SignUpReactHookForm: React.FC = () => {


    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    // console.log(watch("email"))

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
                            {...register("email", {required: true})}
                        />
                        {errors.email && <span>{errors.email.message} aa</span>}

                        <Input
                            label="Password"
                            size="lg"
                            type="password"
                            {...register("password", {required: true, minLength: 5, maxLength: 20})}
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                        <Input
                            label="Confirm Password"
                            size="lg"
                            type="password"
                            {...register("confirmPassword", {required: true})}

                        />
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

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
