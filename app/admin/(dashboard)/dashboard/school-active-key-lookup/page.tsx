"use client";

import React, { useState } from "react";
import Image from "next/image";
import QeuryInfoImage from "@/public/query info.png";
import Error404Image from "@/public/error-404.png";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const SchoolActiveKeyLookup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [schoolEmail, setSchoolEmail] = useState("");
    const [schoolActiveKey, setSchoolActiveKey] = useState({} as any);
    const [_404, set404] = useState(false);
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
                `${baseURL}/admin/school-active-key-lookup/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                    body: JSON.stringify({
                        email: schoolEmail,
                    }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                setSchoolActiveKey(data);
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
                                className="w-[400px] h-[60px] px-4 py-2 border border-[#2f2f37] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2f2f37] focus:ring-opacity-50"
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
                            ""
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
