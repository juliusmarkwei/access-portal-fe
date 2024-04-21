"use client";

import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const UserActivate = () => {
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid") || "";
    const token = searchParams.get("token") || "";
    const router = useRouter();

    useEffect(() => {
        // activateAccount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const activateAccount = async () => {
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
            <div className="">
                <video width={300} height={300} autoPlay loop>
                    <source
                        src="https://cdn-icons-mp4.flaticon.com/512/6569/6569127.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </>
    );
};

export default UserActivate;
