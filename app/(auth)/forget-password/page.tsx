"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
    });
    const router = useRouter();

    const disableBtn = () => {
        return formData.email === "";
    };

    const handleonChange = (e: { target: { name: any; value: any } }) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const hanldeForgetPassword = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await fetch(`${baseURL}/auth/reset-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: formData.email }),
            });
            if (response.ok) {
                toast.success("Hey, check your mail for a password rest link!");
                setIsLoading(false);
                router.push("/login");
            } else {
                const data = await response.json();
                toast.error(data[0]);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <main className="forgetPassword-container">
            <h2 className="ForgotPasswordheading">Forgot Password</h2>
            <div className="message-container">
                <p className="f1-message">
                    Your account security is important to us. Rest assured, your
                    password reset request is safe with us
                </p>
                <p className="f1-message">
                    Please enter your email address below. We&apos;ll send you a
                    link to reset your password.
                </p>
            </div>

            <form
                className="forgetPasswordForm"
                onSubmit={() => toast.success("Sent, check your mail now")}
            >
                <label className="f1-email">Email</label>
                <input
                    className="f1-input focus:border-[#2d7d5c] focus:outline-none focus:ring-1 focus:ring-[#2d7d5c]"
                    type="email"
                    placeholder="Enter your email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleonChange}
                />

                <button
                    onClick={hanldeForgetPassword}
                    disabled={disableBtn() || isLoading}
                    className="f1-button"
                    type="submit"
                >
                    {isLoading ? (
                        <TailSpin
                            color="white"
                            width={50}
                            radius={5}
                            height={40}
                        />
                    ) : (
                        "SEND"
                    )}
                </button>
            </form>
        </main>
    );
};

export default ForgotPassword;
