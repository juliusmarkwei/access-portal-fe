"use client";

import Link from "next/link";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
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
    const [fullName, setFullName] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();

    useEffect(() => {
        // Retrieve the full_name and email from Cookies
        const retrievedFullName = JSON.parse(Cookies.get("hg63_#6y0") || "{}");
        const retrievedEmail = JSON.parse(Cookies.get("bty3_35=") || "{}");
        setFullName(retrievedFullName);
        setEmail(retrievedEmail);
    }, []);

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
                return false;
            }
        };

        isAdmin().then((adminStatus) => {
            if (!adminStatus) router.push("/dashboard");
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
                                    <h1 className="hover:text-[#06b96f] hover:underline text-sm">
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
                        <div className="flex items-center gap-5">
                            <Link href="https://github.com/juliusmarkwei/access-portal">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 496 512"
                                    className="w-6 h-6 cursor-pointer"
                                >
                                    <path
                                        fill="white"
                                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    />
                                </svg>
                            </Link>
                            <Link href={`${baseURL}/`}>
                                <h1 className="text-white cursor-pointer hover:underline">
                                    API Docs
                                </h1>
                            </Link>
                        </div>
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
