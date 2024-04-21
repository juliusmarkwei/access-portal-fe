"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const SignUp = () => {
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        phone: "",
        password: "",
    });
    const route = useRouter();

    const handleonChange = (e: { target: { name: any; value: any } }) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/auth/signup/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    full_name: formData.fullName,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });
            if (response.ok) {
                await response.json();
                toast.success("Account crated successful", { duration: 5000 });
                route.push("/login");
                setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const disableBtn = () => {
        return (
            formData.email === "" ||
            formData.password === "" ||
            formData.fullName === "" ||
            formData.phone === ""
        );
    };

    return (
        <main className="signup-container">
            <div className="signInBox">
                <main>
                    <h1 className="helloText">Welcome Back!</h1>
                    <p>
                        To keep connected with us pleae login with your personal
                        info
                    </p>

                    <button
                        onClick={() => route.push("/login")}
                        disabled={isLoading}
                        className="signInButton-SignUpPage"
                    >
                        SIGN IN
                    </button>
                </main>
            </div>

            <div className="signUpBox">
                <h1 className="signUpHeader">Create Account</h1>
                <form
                    className="signUpForm"
                    onSubmit={() => alert("You created an account!")}
                >
                    <input
                        type="text"
                        className="signUpEmailField"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleonChange}
                        name="email"
                    />
                    <input
                        type="text"
                        className="signUpFirstNameField"
                        placeholder="Full Name"
                        required
                        value={formData.fullName}
                        onChange={handleonChange}
                        name="fullName"
                    />

                    <input
                        type="text"
                        className="signUpPhoneField"
                        placeholder="Phone"
                        required
                        value={formData.phone}
                        onChange={handleonChange}
                        name="phone"
                    />
                    <input
                        type="password"
                        className="signUpPasswordField"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleonChange}
                        name="password"
                    />

                    {isLoading ? (
                        <span className="loading loading-spinner loading-md"></span>
                    ) : (
                        <button
                            disabled={disableBtn() || isLoading}
                            onClick={handleSignUp}
                            type="submit"
                            className="signUpButton-SignUpPage"
                        >
                            {isLoading ? (
                                <TailSpin
                                    color="white"
                                    width={50}
                                    radius={5}
                                    height={40}
                                />
                            ) : (
                                "SIGN UP"
                            )}
                        </button>
                    )}
                </form>
            </div>
        </main>
    );
};

export default SignUp;
