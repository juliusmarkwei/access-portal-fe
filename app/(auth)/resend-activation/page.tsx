"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const ResendActivation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const router = useRouter();

    const handleOnChange = (e: { target: { value: any } }) => {
        const value = e.target.value;
        setEmail((prev) => (prev = value));
    };

    const resendActivation = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                `${baseURL}/auth/user/resend_activation/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );
            if (response.ok) {
                toast.success("Check your mail to activate account", {
                    duration: 4000,
                });
                setIsLoading(false);
                router.push("/login");
            } else {
                toast.error("Given email does not exist, try again!", {
                    duration: 4000,
                });
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong, try again!", {
                duration: 4000,
            });
            setIsLoading(false);
        }
    };
    const disableBtn = () => {
        return email === "";
    };
    return (
        <>
            <main className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-[#121b33] text-[3.5rem]">
                    Resend activation link
                </h1>
                <p className="text-black m-8">
                    The link will be active for 1 day
                </p>
                <form
                    onSubmit={(e) => resendActivation(e)}
                    className="flex flex-col justify-center items-center"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="absolute overflow-hidden w-0 h-[-1px]"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleOnChange}
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="h-12 w-80 border-2 border-[#06b96f] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#06b96f] focus:border-transparent"
                        />
                    </div>
                    <button
                        disabled={isLoading || disableBtn()}
                        type="submit"
                        className="p-5 mt-5 w-32 text-white bg-[#06b96f] rounded-md hover:bg-[#00ff95]"
                    >
                        Resend
                    </button>
                </form>
            </main>
        </>
    );
};

export default ResendActivation;
