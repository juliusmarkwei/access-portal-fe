"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Logout from "@/app/components/Logout";
import { useAppContext } from "@/app/context";

interface LayoutProps {
    children: ReactNode;
}

interface Keys {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter();
    const [fullName, setFullName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [keys, setKeys] = useState<Keys[]>();
    const access_token = Cookies.get("access_token");
    const [keyTagSearch, setKeyTagSearch] = useState("");
    // const { searchQuery, setSearchQuery, keys, setKeys } = useAppContext();

    useLayoutEffect(() => {
        // Retrieve the full_name and email from Cookies
        const retrievedFullName = Cookies.get("hg63_#6y0") as string;
        const retrievedEmail = Cookies.get("bty3_35=") as string;
        setFullName(JSON.parse(retrievedFullName));
        setEmail(JSON.parse(retrievedEmail));
    }, []);

    useEffect(() => {
        loadKeys();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadKeys = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/access-key/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${access_token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setKeys(data);
                setIsLoading(false);
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("An error occured", { duration: 4000 });
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("_se7_wer_");
        Cookies.remove("hg63_#6y0");
        Cookies.remove("bty3_35=");
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
                                            ? "bg-[#46efa9] border-[3px] border-[#46efa9] text-white"
                                            : "text-[#46efa9] border-[3px] border-[#46efa9] hover:text-white hover:bg-[#46efa9]"
                                    } flex items-center gap-x-2 px-2 py-2 mb-4 rounded-md text-sm font-semibold leading-6`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 pb-1"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm0 8.625a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM15.375 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                            clip-rule="evenodd"
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

            <aside className="h-[100vh] container md:pt-12 w-full">
                <div className="flex h-8 mt-[-20px] ml-8 items-center gap-2">
                    {_manageKeys ? (
                        <>
                            <label className="input input-bordered flex items-center gap-2 mr-[60%]">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Search key tag..."
                                    value={keyTagSearch}
                                    onChange={(e) =>
                                        setKeyTagSearch(e.target.value)
                                    }
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-4 h-4 opacity-70"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </label>
                        </>
                    ) : (
                        <div className="flex items-center gap-2 mr-[89.3%]"></div>
                    )}

                    <Link href={`${baseURL}/`}>
                        <Image
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAAAgICAhHyC1tbUXFxcJCQmZmZnU1NQVExTR0dFqamoFAAB1dXUTExMbGxv39/fo6OhYWFg4ODje3t7FxcWIiIiCgoKkoqOqqqru7u7i4uIRDhD5+flHR0e2trZAQEAzMzNQUFBjY2PAvr+Uk5QnJyd2dHVVVVU2NjYnJCZ06P9MAAADqUlEQVR4nO3dbVOyQBSH8d1FVk0FH/IZCyu1+v4f8EZshi3R6j7nxJn6/142tdM1wAq6oDEAAAAAAAAAAAAAAAAAAAAAAAAAAADM1rc0m6YDrlvNtmnSpcgeVk1HXNPZ+9S5iCTLh01nXDaKY+fSmCAtErtbvYmHLHL2bkyQHxOzO6076spGkV2Shlj2I82JUxt1H2lDLMrCyCudblrW+TZtiKLQbb0rtqLKY/GepbDfmhd7ezbRmMizDYsjeVAkdnOFOypboZlbFyUKpxu+wjJR4YzKWGjKY1FdImdheSwm2k7gWAtP042yEzjewnJHVTajMhcqPBa5C8tEVS8a7IXqXjT4C087qp4ZVaDwNN2oOUeVKDwmOjUzqkihqhlVplBTolDh6QROxSWxVGH5otF9UZAoVqjmkpin0C9qfq7kWGQofLJRWnvEzbyGEziGwuHxiMvvp+fuUgVbkaHQtIvdMbXn+unprWKWf/S/fShctWfXdeoG6dmixZ15+9jG1v7Nj/lQOLbZVd6O6kbZRTZLzhz/oEi3Nz8VU+t94XCfnm+Kdy78u6PWbF4rT5Vtw1nN4fTOd6+KDpmyQtOpmRJD3/08+9DVVsht0HW/vTBBoTQUUqFQHgqpUCgPhVQolPehcN17pixxOxkE71uoK8w9ZZXiGxssI9NWuPn0Cvgr4rwaX1uhWXx2BfwlT9WA6grNakQXvg2gr5AbCuWhkAqF8lBIhUJ5f65w89SimwbjqyscsJyX7oIBlRUOX1PaTWyleFKNr63Q9Gyfzs6rAdUVDpdtulYwvrpCdiiUh0IqFMpDIRUK5f29ws2QLlxVpK6w5RkuLdLg8klb4WYbM3xukQQrSrUVmkmS0vnnakB1hZ2HlwnVdryuBlRXyA6F8lBIhUJ5KKRCoTwUUqkrHPXoi76w6uuHffe+p69QveqrzXABbH3wwYW6QvJzPo/CG/j0FXJDoTwUUqFQHgqpUCjv7xVOGVZ9hbfsqyucc5yX2nAZmbJCplVfeTW+tkIztp7ODqoB1RUOFzvyoq9d+EgldYXsUCgPhVQolIdCKhTKQyEVCuUxfIPHVcdnfTX7RLqpdUlPcPy7NLLrz39N0Mo6F94/z2x5fGhkw99Z9pg458c9GQ/9KPKzZgPNrS8u62PS165dFkcu3jf9iFYzTTKGdy4uSP3+tulAY0aHV89xy1qNbD9vfAuWVp0bGR0FT7sGAAAAAAAAAAAAAAAAAAAAAAAAAIBf5h8BJpOtPejX2gAAAABJRU5ErkJggg=="
                            alt="docs image"
                            width={40}
                            height={40}
                            className="text-black cursor-pointer relative"
                            title="API Documentation"
                        />
                    </Link>
                    <div
                        className={`w-4 h-4 border-2  rounded-full relative flex justify-center items-center ${
                            isLoading
                                ? "bg-[#e7fc2b] border-[#e7fc2b]"
                                : keys?.some((key) => key.status === "active")
                                ? "bg-green-400 border-green-400"
                                : "bg-[#f42a2a] border-[#e37070]"
                        } animate-pulse`}
                        title="Active Key Status"
                    ></div>
                </div>
                {children}
            </aside>
        </div>
    );
};

export default Layout;
