"use client";

import Link from "next/link";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation"; // Changed from "next/navigation"
import Logout from "@/components/Logout";
import { AppWrapper } from "@/context";

interface LayoutProps {
    children: ReactNode;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    let fullName = "";
    let email = "";

    const fullNameCookie = Cookies.get("hg63_#6y0") || "{}"; // Provide default empty object if cookie is not present
    const emailCookie = Cookies.get("bty3_35=") || "{}"; // Provide default empty object if cookie is not present

    try {
        fullName = JSON.parse(fullNameCookie);
    } catch (error) {
        console.error("Error parsing fullName cookie:", error);
    }

    try {
        email = JSON.parse(emailCookie);
    } catch (error) {
        console.error("Error parsing email cookie:", error);
    }

    useLayoutEffect(() => {
        const isAdmin = async () => {
            const accessToken = Cookies.get("access-token");
            try {
                const response = await fetch(`${baseURL}/auth/users/me/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const adminStatus = data.is_admin;
                    return adminStatus;
                }
                return false;
            } catch (error) {
                console.error("Error checking admin status:", error);
                return false;
            }
        };

        isAdmin().then((adminStatus) => {
            if (!adminStatus) router.push("/dashboard");
            console.log(adminStatus);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const _dashboard = /^\/admin\/dashboard$/.test(pathName);
    const _manageKeys = pathName.includes("manage-keys");
    const _schools = pathName.includes("schools");
    const _schoolActiveKeyLookup = pathName.includes(
        "school-active-key-lookup"
    );

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
                                <Link
                                    href="/dashboard"
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
                                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                        />
                                    </svg>
                                    <h1 className="hover:text-[#06b96f] hover:underline">
                                        Go to school dashboard
                                    </h1>
                                </Link>
                            </div>

                            <ul
                                role="list"
                                className="flex flex-col justify-between -mx-2 space-y-4"
                            >
                                <Link
                                    href="/admin/dashboard"
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
                                    href="/admin/dashboard/manage-keys"
                                    className={`${
                                        _manageKeys
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
                                            d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Manage Keys
                                </Link>
                                <Link
                                    href="/admin/dashboard/schools"
                                    className={`${
                                        _schools
                                            ? "bg-[#06b96f] border-[3px] border-[#06b96f] text-white"
                                            : "text-[#06b96f] border-[3px] border-[#06b96f] hover:text-white hover:bg-[#06b96f]"
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 transition-colors duration-500 ease-in-out`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                        />
                                    </svg>
                                    Schools
                                </Link>
                                <Link
                                    href="/admin/dashboard/school-active-key-lookup"
                                    className={`${
                                        _schoolActiveKeyLookup
                                            ? "bg-[#06b96f] border-[3px] border-[#06b96f] text-white"
                                            : "text-[#06b96f] border-[3px] border-[#06b96f] hover:text-white hover:bg-[#06b96f]"
                                    } flex items-center gap-x-2 px-2 py-2 rounded-md text-sm font-semibold leading-6 transition-colors duration-500 ease-in-out`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                        />
                                    </svg>
                                    School&apos;s Active Key Lookup
                                </Link>
                            </ul>
                        </li>
                        <Logout
                            handleLogout={handleLogout}
                            userData={{
                                fullName: fullName,
                                email: email,
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
