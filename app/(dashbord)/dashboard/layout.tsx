"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Logout from "@/app/components/Logout";

interface LayoutProps {
    children: ReactNode;
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    // useLayoutEffect(() => {
    //     const checkuserdata = Cookies.get("_se7_wer_") as string;
    //     if (!checkuserdata) getUserData();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        toast.success("Logout successful", { duration: 5000 });
        router.push("/login");
    };

    const pathName = usePathname();
    const _dashboard = /^\/dashboard$/.test(pathName);
    const _generateKey = pathName.includes("generate-key");
    const _manageKeys = pathName.includes("manage-keys");

    const accessToken = Cookies.get("access_token");

    const getUserData = async () => {
        const response = await fetch(`${baseUrl}/auth/users/me/`, {
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

    return (
        <div className="w-full flex h-screen">
            <div className="md:hidden">
                {/* <MobileChatLayout friends={friends} session={session} sidebarOptions={sidebarOptions} unseenRequestCount={unseenRequestCount} /> */}
            </div>
            <div className="hidden md:flex h-full w-full max-w-72 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-[#121b33] px-6">
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-9">
                        <li role="list">
                            {/* <SidebarChatList sessionId={session.user.id} friends={friends} /> */}
                        </li>
                        <li>
                            <div className="text-xs font-semibold leading-6 mb-8 text-[#ffffff]">
                                Overview
                            </div>

                            <ul
                                role="list"
                                className="flex flex-col justify-between -mx-2 space-y-4"
                            >
                                <Link
                                    href="/dashboard"
                                    className={`${
                                        _dashboard
                                            ? "bg-[#46efa9] border-[3px] border-[#46efa9] text-white"
                                            : "text-[#46efa9] border-[3px] border-[#46efa9] hover:text-white hover:bg-[#46efa9]"
                                    }  flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/generate-key"
                                    className={`${
                                        _generateKey
                                            ? "bg-[#46efa9] border-[3px] border-[#46efa9] text-white"
                                            : "text-[#46efa9] border-[3px] border-[#46efa9] hover:text-white hover:bg-[#46efa9]"
                                    } flex items-center gap-x-2 px-2 py-2 mb-4 rounded-md text-sm font-semibold leading-6`}
                                >
                                    Generate Key
                                </Link>
                                <Link
                                    href="/dashboard/manage-keys"
                                    className={`${
                                        _manageKeys
                                            ? "bg-[#46efa9] border-[3px] border-[#46efa9] text-white"
                                            : "text-[#46efa9] border-[3px] border-[#46efa9] hover:text-white hover:bg-[#46efa9]"
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6`}
                                >
                                    Manage Keys
                                </Link>
                            </ul>
                        </li>

                        <Logout handleLogout={handleLogout} />
                    </ul>
                </nav>
            </div>

            <aside className="max-h-screen container py-16 md:py-12 w-full">
                {children}
            </aside>
        </div>
    );
};

export default Layout;
