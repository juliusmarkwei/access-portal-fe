"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const route = useRouter();

    const handleonChange = (e: { target: { name: any; value: any } }) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const disableBtn = () => {
        return formData.email === "" || formData.password === "";
    };

    const getUserData = async (accessToken: string) => {
        const response = await fetch(`${baseURL}/auth/users/me/`, {
            method: "GET",
            headers: {
                Authorization: `JWT ${accessToken}`,
            },
        });
        if (response.ok) {
            Cookies.set("_se7_wer_", "true");
            const data = await response.json();
            Cookies.set("hg63_#6y0", JSON.stringify(data.full_name));
            Cookies.set("bty3_35=", JSON.stringify(data.email));
        }
    };

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch(`${baseURL}/auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                Cookies.set("access_token", data.access);
                Cookies.set("refresh_token", data.refresh);
                Cookies.set(
                    "access_token_expiry",
                    (new Date().getTime() + 3600000 * 24).toString(),
                    { expires: new Date(Date.now() + 3600000 * 24) }
                );
                Cookies.set(
                    "refresh_token_expiry",
                    (new Date().getTime() + 3600000 * 24 * 30).toString(),
                    { expires: new Date(Date.now() + 3600000 * 24 * 30) }
                );
                const checkuserdata = Cookies.get("_se7_wer_") as string;
                if (!checkuserdata) await getUserData(data.access);
                toast.success("Login successful", { duration: 4000 });
                route.push("/");
                setLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setLoading(false);
            }
        } catch (error) {
            toast.error("An error occured, try again!", { duration: 4000 });
            setLoading(false);
        }
    };

    return (
        <main className="login-container">
            <div className="loginBox">
                <h1 className="loginHeader">Sign in to ACCESS PORTAL</h1>
                <form className="loginForm">
                    <input
                        required
                        type="text"
                        name="email"
                        className="loginUsernameField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-[#06b96f]"
                        placeholder="Email"
                        defaultValue={formData.email}
                        onChange={handleonChange}
                    />
                    <input
                        required
                        type="password"
                        name="password"
                        className="loginPasswordField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-[#06b96f]"
                        placeholder="Password"
                        defaultValue={formData.password}
                        onChange={handleonChange}
                    />
                    <h4 className="forgotPassword">
                        <Link href="/forget-password">
                            Forgot your password?
                        </Link>
                    </h4>
                    <button
                        disabled={disableBtn() || isLoading}
                        onClick={handleLogin}
                        type="submit"
                        className={`signInButton-Loginpage ${
                            isLoading
                                ? "hover:cursor-not-allowed bg-[#e2ae65]"
                                : ""
                        }`}
                    >
                        {isLoading ? (
                            <TailSpin
                                color="white"
                                width={50}
                                radius={5}
                                height={40}
                            />
                        ) : (
                            "SIGN IN"
                        )}
                    </button>
                </form>
            </div>
            <div className="login-signUpBox">
                <main>
                    <h1 className="helloText">Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>

                    <button
                        onClick={() => route.push("/signup")}
                        disabled={isLoading}
                        className="signUpButton-Loginpage ml-[30%]"
                    >
                        SIGN UP
                    </button>
                </main>
            </div>
        </main>
    );
};

export default Login;
