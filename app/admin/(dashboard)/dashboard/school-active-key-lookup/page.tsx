"use client";

import React, { useState } from "react";
import Image from "next/image";
import QeuryInfoImage from "@/public/query info.png";
import Error404Image from "@/public/error-404.png";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface SchoolActiveKeyDataType {
    owner: string;
    key: string;
    key_tag: string;
    validity_duration_days: number;
    status: boolean;
    procurement_date: string;
    expiry_date: string;
    created_at: string;
    school: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const SchoolActiveKeyLookup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [schoolEmail, setSchoolEmail] = useState("");
    const [schoolActiveKeyData, setSchoolActiveKeyData] =
        useState<SchoolActiveKeyDataType>();
    const [_404, set404] = useState(false);
    const [swicthCopiedImage, setSwicthCopiedImage] = useState(false);
    const accessToken = Cookies.get("access-token");

    const handleShowModal = () => {
        const modal = document.getElementById(
            "my_modal_1"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const handleQuerySchoolActiveKey = async (e: any) => {
        e.preventDefault();
        try {
            handleShowModal();
            setIsLoading(true);
            const response = await fetch(
                `${baseURL}/admin/school-active-key-lookup/${schoolEmail}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setSchoolActiveKeyData(data);
                set404(false);
            } else {
                set404(true);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.", {
                duration: 4000,
            });
        }
        setIsLoading(false);
        setSchoolEmail("");
    };

    const handelCopied = (textTOCopy: string) => {
        navigator.clipboard.writeText(textTOCopy);
        toast.success("Key copied", { duration: 4000 });
        setSwicthCopiedImage(true); // Immediately set to true
        setTimeout(() => {
            setSwicthCopiedImage(false); // Set back to false after 2 seconds
        }, 2000);
    };
    console.log(_404);
    return (
        <>
            <div className="container pb-12 h-[90dvh] px-8">
                <div className="font-bold text-3xl mb-3 text-[#393b3f]">
                    <span className="flex flex-row items-center gap-4">
                        {" "}
                        Query School&apos;s Active Key Status{" "}
                        <span title="Query for school's active account if it exist. return key information, else 404">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                                />
                            </svg>
                        </span>
                    </span>
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                </div>
                <main className="h-[75dvh]">
                    <div className="grid grid-cols-2 grid-rows-1 h-full">
                        <form
                            className="flex flex-col justify-center items-center gap-5 border-r-2 border-black"
                            onSubmit={handleQuerySchoolActiveKey}
                        >
                            <input
                                type="email"
                                placeholder="Enter school email..."
                                className="w-[80%] h-[60px] px-4 py-2 border border-[#2f2f37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f2f37] focus:ring-opacity-50"
                                value={schoolEmail}
                                onChange={(e) => setSchoolEmail(e.target.value)}
                                required
                            />
                            <button
                                className={`w-32 h-14 px-4 py-2 flex justify-center items-center border-2 border-[#121b33] text-[#121b33] transition ease-in rounded-md hover:bg-[#121b33] hover:text-white ${
                                    schoolEmail === "" && "cursor-not-allowed"
                                }`}
                                disabled={schoolEmail === ""}
                                type="submit"
                            >
                                Query
                            </button>
                        </form>
                        <div className="flex justify-center items-center">
                            <Image
                                src={QeuryInfoImage.src}
                                alt="School Logo"
                                width={450}
                                height={400}
                            />
                        </div>
                    </div>
                </main>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <span className="loading loading-ring loading-lg h-[45vh] px-[10%] bg-green-400"></span>
                            </div>
                        ) : _404 ? (
                            <span className="flex justify-center items-center h-[45vh]">
                                <Image
                                    src={Error404Image.src}
                                    alt="404"
                                    width={300}
                                    height={300}
                                />
                            </span>
                        ) : (
                            <div className="h-[55dvh]">
                                <table className="table table-pin-rows">
                                    {schoolActiveKeyData && (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th className="flex items-center justify-center text-[1.2rem]">
                                                        {
                                                            schoolActiveKeyData.school
                                                        }
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="flex items-center gap-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 16 16"
                                                            fill="currentColor"
                                                            className="w-5 h-5 opacity-70"
                                                        >
                                                            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                                            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                                        </svg>

                                                        {
                                                            schoolActiveKeyData.owner
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center gap-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 6h.008v.008H6V6Z"
                                                            />
                                                        </svg>

                                                        {
                                                            schoolActiveKeyData.key_tag
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center gap-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                                                            />
                                                        </svg>
                                                        <span className="cursor-copy border-[1px] bg-gray-200 border-[#d7d1d1] rounded-lg px-2 py-1 relative inline-block group">
                                                            {schoolActiveKeyData.key.slice(
                                                                0,
                                                                10
                                                            ) + "..."}

                                                            <span
                                                                className="group-hover:opacity-100 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-500 bg-green-400 h-7 pt-1 rounded-md"
                                                                onClick={() =>
                                                                    handelCopied(
                                                                        schoolActiveKeyData.key
                                                                    )
                                                                }
                                                            >
                                                                {swicthCopiedImage ? (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-6 h-5"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                ) : (
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 24 24"
                                                                        fill="currentColor"
                                                                        className="w-6 h-5"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="flex items-center gap-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m4.5 12.75 6 6 9-13.5"
                                                            />
                                                        </svg>

                                                        {
                                                            schoolActiveKeyData.status
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        className="flex items-center gap-4"
                                                        title="Key validity duration in days as at time of activation"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                                            />
                                                        </svg>
                                                        {
                                                            schoolActiveKeyData.validity_duration_days
                                                        }{" "}
                                                        {schoolActiveKeyData.validity_duration_days >
                                                        1
                                                            ? "days"
                                                            : "day"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        className="flex items-center gap-4"
                                                        title="Procurement date"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                                            />
                                                        </svg>

                                                        {
                                                            schoolActiveKeyData.procurement_date
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td
                                                        className="flex items-center gap-4"
                                                        title="Expiry date"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5 text-red-500"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                                            />
                                                        </svg>

                                                        {
                                                            schoolActiveKeyData.expiry_date
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </>
                                    )}
                                </table>
                            </div>
                        )}

                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button
                                    className="btn"
                                    onClick={() => set404(false)}
                                >
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default SchoolActiveKeyLookup;
