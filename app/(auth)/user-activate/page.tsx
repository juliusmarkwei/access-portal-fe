/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import shieldImage from "@/public/shield.gif";
import activationFailed from "@/public/accountActicvationFailed.svg";
import Image from "next/image";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const UserActivate = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid") || "";
    const token = searchParams.get("token") || "";
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [accountActicated, setAccountActicated] = useState<boolean>(true);

    const activateAccount = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseURL}/auth/user/activate/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid, token }),
            });

            if (res.ok) {
                setIsLoading(false);
                setAccountActicated(true);
            } else {
                toast.error("Invalid activation link, try again!", {
                    duration: 4000,
                });
                setIsLoading(false);
                setAccountActicated(false);
            }
        } catch (error) {
            toast.error("An error occured", { duration: 4000 });
            setIsLoading(false);
            setAccountActicated(false);
        }
    };

    useEffect(() => {
        activateAccount();
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-ring loading-lg h-[70vh] px-[10%] bg-green-400"></span>
                </div>
            ) : accountActicated ? (
                <div className="flex flex-col justify-center items-center m-20">
                    <Image
                        src={shieldImage}
                        alt="shield"
                        width={300}
                        height={300}
                        unoptimized
                    />
                    <h1 className="pt-8 text-xl text-[#121b33]">
                        Congratulations, your account has been activated!
                    </h1>
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="h-14 w-32 rounded mt-8 bg-[#06b96f] hover:bg-[#2d7d5c] text-white"
                    >
                        LOGIN
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-4 justify-center items-center max-h-[80dvh]">
                    <Image
                        src={activationFailed}
                        alt="activation failed"
                        width={600}
                        height={300}
                        className="mb-[-10%]"
                    />

                    <h1 className="pt-8 font-bold text-[2rem] font-serif text-[#121b33]">
                        Account activation failed!
                    </h1>
                    <button
                        onClick={() => router.push("resend-activation")}
                        className="p-5 mt-4 text-white bg-[#06b96f] rounded-lg hover:bg-[#2d7d5c]"
                    >
                        Resend Activation
                    </button>
                </div>
            )}
        </>
    );
};

export default UserActivate;
