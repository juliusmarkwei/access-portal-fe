"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        re_password: "",
    });
    const router = useRouter();

    const searchParams = useSearchParams();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const handleonChange = (e: { target: { name: any; value: any } }) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const disableBtn = () => {
        return formData.password === "" || formData.re_password === "";
    };

    const hanldeResetPasswordConfirm = async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            if (formData.password !== formData.re_password) {
                toast.error("Password do not match!", { duration: 5000 });
                setIsLoading(false);
                return;
            }
            const response = await fetch(
                `${baseURL}/auth/reset-password-confirm/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        new_password: formData.password,
                        re_new_password: formData.re_password,
                        token: token,
                        uid: uid,
                    }),
                }
            );
            if (response.ok) {
                toast.success("Password changed successful", {
                    duration: 5000,
                });
                setIsLoading(false);
                router.push("/login");
            } else {
                const data = await response.json();
                toast.error(data.detail, { duration: 5000 });
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <main className="resetPassword-container">
            <h1 className="headingResetPassword">Create New Password</h1>
            <p className="messageResetPassword">
                Create a strong password to help secure your account. Include a
                mix of uppercase and lowercase letters, numbers, and special
                characters for added security
            </p>
            <form className="resetPasswordForm">
                <label className="passwordLabel">New Password</label>
                <input
                    className="passwordInput"
                    type="password"
                    placeholder="Enter new password"
                    required
                    onChange={handleonChange}
                    value={formData.password}
                    name="password"
                />
                <br />
                <label className="passwordLabel">Confirm Password</label>
                <input
                    className="passwordInput"
                    type="password"
                    onChange={handleonChange}
                    name="re_password"
                    value={formData.re_password}
                    placeholder="Confirm new password"
                    required
                />
                <br />

                <button
                    onClick={hanldeResetPasswordConfirm}
                    className="changePasswrdButton"
                    type="submit"
                    disabled={disableBtn() || isLoading}
                >
                    {isLoading ? (
                        <TailSpin
                            color="white"
                            width={50}
                            radius={5}
                            height={40}
                        />
                    ) : (
                        "Change Password"
                    )}
                </button>
            </form>
        </main>
    );
};

export default ResetPassword;
