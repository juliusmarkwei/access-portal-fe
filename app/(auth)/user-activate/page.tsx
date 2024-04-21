"use client";

import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import shieldImage from "@/public/shield.png";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const UserActivate = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid") || "";
    const token = searchParams.get("token") || "";
    const router = useRouter();

    useEffect(() => {
        activateAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const activateAccount = async () => {
        console.log(`${baseUrl}/auth/user/activate/`);
        try {
            const res = await fetch(`${baseUrl}/auth/user/activate/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uid, token }),
            });

            if (res.ok) {
                toast.success("Account activated successfully");
            } else {
                toast.error("Invalid activation link, try again!", {
                    duration: 4000,
                });
                router.push("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="flex flex-col justify-center items-center m-20">
                {/* <video width={300} height={300} autoPlay loop>
                    <source
                        src={}
                        type="video/mp4"
                    />
                </video> */}
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
        </>
    );
};

export default UserActivate;
