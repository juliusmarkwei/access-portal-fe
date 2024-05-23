"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Logout from "@/components/Logout";
import { AppWrapper } from "@/context";
import Link from "next/link";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();

    const isAdmin = Cookies.get("AGhd783=#");
    const [fullName, setFullName] = useState<string | undefined>("");
    const [email, setEmail] = useState<string | undefined>("");

    useEffect(() => {
        // Retrieve the full_name and email from Cookies
        const retrievedFullName = Cookies.get("hg63_#6y0");
        const retrievedEmail = Cookies.get("bty3_35=");

        if (retrievedFullName) {
            setFullName(JSON.parse(retrievedFullName));
        }

        if (retrievedEmail) {
            setEmail(JSON.parse(retrievedEmail));
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("access-token");
        Cookies.remove("refresh-token");
        Cookies.remove("_se7_wer_");
        Cookies.remove("hg63_#6y0");
        Cookies.remove("bty3_35=");
        Cookies.remove("AGhd783=#");
        router.push("/login");
        toast.success("Logout successful", { duration: 5000 });
    };

    const pathName = usePathname();
    const _dashboard = /^\/dashboard$/.test(pathName);
    const _generateKey = pathName.includes("generate-key");
    const _manageKeys = pathName.includes("manage-keys");

    return (
        <div className="w-full flex h-screen">
            <div className="md:hidden">
                {/* <MobileChatLayout friends={friends} session={session} sidebarOptions={sidebarOptions} unseenRequestCount={unseenRequestCount} /> */}
            </div>
            <div className="hidden md:flex h-full w-full max-w-72 grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-[#121b33] px-6">
                <nav className="flex flex-1 flex-col">
                    <ul
                        role="list"
                        className="flex flex-1 flex-col gap-y-9 mt-12"
                    >
                        <li>
                            <div className="text-xs font-semibold leading-6 mb-8 text-[#ffffff]">
                                <h1 className="pl-7">Overview</h1>
                                {isAdmin === "true" ? (
                                    <Link
                                        href="/admin/dashboard"
                                        className="cursor-pointer flex gap-3 items-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 hover:text-[#06b96f]"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3"
                                            />
                                        </svg>
                                        <h1 className="hover:text-[#06b96f] hover:underline text-sm">
                                            Go to admin panel
                                        </h1>
                                    </Link>
                                ) : null}
                            </div>

                            <ul
                                role="list"
                                className="flex flex-col justify-between -mx-2 space-y-4"
                            >
                                <Link
                                    href="/dashboard"
                                    className={`${
                                        _dashboard
                                            ? "bg-[#06b96f] border-[3px] border-[#06b96f] text-white"
                                            : "text-[#06b96f] border-[3px] border-[#06b96f] hover:text-white hover:bg-[#06b96f]"
                                    }  flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 transition-colors duration-500 ease-in-out`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                    </svg>
                                    Dashboard
                                </Link>
                                <Link
                                    href="/dashboard/generate-key"
                                    className={`${
                                        _generateKey
                                            ? "bg-[#06b96f] border-[3px] border-[#06b96f] text-white"
                                            : "text-[#06b96f] border-[3px] border-[#06b96f] hover:text-white hover:bg-[#06b96f]"
                                    } flex items-center gap-x-2 px-2 py-2 mb-4 rounded-md text-sm font-semibold leading-6 transition-colors duration-500 ease-in-out`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a.75.75 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Generate Access Key
                                </Link>
                                <Link
                                    href="/dashboard/manage-keys"
                                    className={`${
                                        _manageKeys
                                            ? "bg-[#06b96f] border-[3px] border-[#06b96f] text-white"
                                            : "text-[#06b96f] border-[3px] border-[#06b96f] hover:text-white hover:bg-[#06b96f]"
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 transition-colors duration-500 ease-in-out`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Manage Keys
                                </Link>
                            </ul>
                        </li>
                        <Logout
                            handleLogout={handleLogout}
                            userData={{
                                fullName: fullName ?? "",
                                email: email ?? "",
                            }}
                        />
                    </ul>
                </nav>
            </div>
            <AppWrapper>
                <aside className="h-[100vh] container md:pt-12">
                    {children}
                </aside>
            </AppWrapper>
        </div>
    );
};

export default Layout;
