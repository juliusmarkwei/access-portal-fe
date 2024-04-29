"use client";

import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import shieldImage from "@/public/shield.gif";
import Spinner from "@/public/Spinner@1x-1.0s-200px-200px.svg";
import activationFailed from "@/public/activation failed.png";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

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
            const res = await fetch(`${baseUrl}/auth/user/activate/`, {
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
            console.error(error);
            setIsLoading(false);
            setAccountActicated(false);
        }
        console.log(isLoading);
    };

    useEffect(() => {
        activateAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Image
                        src={Spinner}
                        alt="loading spinner"
                        width={200}
                        height={200}
                    />
                </div>
            ) : accountActicated ? (
                <div className="flex flex-col justify-center items-center m-20">
                    <Image
                        src={shieldImage.src}
                        alt="shield"
                        width={300}
                        height={300}
                    />
                    <h1 className="pt-8 font-bold text-2xl font-serif text-teal-500">
                        Congratulations, your account has been activated!
                    </h1>
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="h-14 w-32 rounded mt-8 bg-teal-700 hover:bg-teal-800 text-white font-medium"
                    >
                        LOGIN
                    </button>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center min-h-screen">
                    <Image
                        src={activationFailed}
                        alt="activation failed"
                        width={300}
                        height={300}
                    />

                    <h1 className="pt-8 font-bold text-2xl font-serif text-purple-500">
                        Account activation failed!
                    </h1>
                    <button
                        onClick={() => router.push("resend-activation")}
                        className="p-5 mt-4 text-white bg-[#8832cd] rounded-md hover:bg-[#6106ac]"
                    >
                        Resend Activation
                    </button>
                </div>
            )}
        </>
    );
};

export default UserActivate;
