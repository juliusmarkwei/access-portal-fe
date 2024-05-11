"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import StatusIndicator from "@/components/StatusIndicator";
import SearchUI from "@/components/SearchUI";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface KeysType {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
}

const ManageKeys = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [_isLoading, _setIsLoading] = useState(false);
    const accessToken = Cookies.get("access-token");
    const [swicthCopiedImage, setSwicthCopiedImage] = useState(false);
    const { keys, setKeys } = useAppContext();
    const { filteredKeys } = useAppContext();
    const [selectedkeyTag, setSelectedKeyTag] = useState("");
    const route = useRouter();

    const handleImageClick = (keyTag: string) => {
        setSelectedKeyTag(keyTag);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Check if selectedkeyTag is truthy and the target is not inside a td element
            if (
                selectedkeyTag &&
                !(
                    e.target instanceof HTMLElement &&
                    e.target.closest(selectedkeyTag) &&
                    e.target.closest("td")
                )
            ) {
                setSelectedKeyTag(""); // Clear selected key tag
            }
        };

        document.addEventListener("click", handleClickOutside);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [selectedkeyTag]);

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
                    Authorization: `JWT ${accessToken}`,
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

    const handelCopied = (textTOCopy: string) => {
        navigator.clipboard.writeText(textTOCopy);
        toast.success("Key copied", { duration: 4000 });
        setSwicthCopiedImage(true); // Immediately set to true
        setTimeout(() => {
            setSwicthCopiedImage(false); // Set back to false after 2 seconds
        }, 2000);
    };

    const handleRevokeAccessKey = async (keyTag: string) => {
        _setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/access-key/${keyTag}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                setSelectedKeyTag(""); // Clear selected key tag
                loadKeys();
                _setIsLoading(false);
                route.refresh();
                toast.success("Key revoked successfully", { duration: 4000 });
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
                _setIsLoading(false);
            }
        } catch (error) {
            toast.error("An error occured", { duration: 4000 });
            _setIsLoading(false);
        }
    };

    const handleDeleteInactiveAccessKey = async (keyTag: string) => {
        _setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/access-key/${keyTag}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                setSelectedKeyTag(""); // Clear selected key tag
                loadKeys();
                _setIsLoading(false);
                route.refresh();
                toast.success("Key deleted successfully", { duration: 4000 });
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
                _setIsLoading(false);
            }
        } catch (error) {
            toast.error("An error occured", { duration: 4000 });
            _setIsLoading(false);
        }
    };

    return (
        <>
            <StatusIndicator
                isLoading={isLoading}
                SearchUI={SearchUI}
                setIsLoading={setIsLoading}
            />

            <div className="container pt-12 px-8 flex flex-col max-h-[90dvh] ">
                <div className="flex flex-row font-bold text-3xl text-[#393b3f]">
                    Manage Keys
                </div>
                <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                {_isLoading && (
                    <span className="loading loading-spinner loading-lg h-[70vh] px-[10%] ml-[40%] bg-green-400"></span>
                )}
                {!_isLoading && (
                    <main className="h-[70dvh]">
                        {isLoading ? (
                            <span className="loading loading-spinner loading-lg h-[70vh] px-[10%] ml-[40%] bg-green-400"></span>
                        ) : (
                            // <span className="loading loading-spinner loading-lg flex justify-center items-center text-[#32ffa9] mt-10 border-[5px] border-[#32ffa9] p-2"></span>
                            <div className="overflow-x-auto h-[60dvh]">
                                <table className="table ">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Key Tag</th>
                                            <th>Key</th>
                                            <th>Status</th>
                                            <th>Date of Procurement</th>
                                            <th>Valid Until</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredKeys &&
                                            filteredKeys.map(
                                                (key: any, index: number) => (
                                                    <React.Fragment key={index}>
                                                        <tr>
                                                            <th>{index + 1}</th>
                                                            <td>
                                                                {key.key_tag}
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`${
                                                                        key.status ===
                                                                        "active"
                                                                            ? "cursor-copy"
                                                                            : "cursor-not-allowed"
                                                                    } border-[1px] bg-gray-200 border-[#d7d1d1] rounded-lg px-2 py-1 relative inline-block group`}
                                                                >
                                                                    {key.key
                                                                        .length >
                                                                    14
                                                                        ? key.key.slice(
                                                                              0,
                                                                              10
                                                                          ) +
                                                                          "..."
                                                                        : key.key}
                                                                    {key.status ===
                                                                    "active" ? (
                                                                        <span
                                                                            className="group-hover:opacity-100 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-500 bg-green-400 h-7 pt-1 rounded-md"
                                                                            onClick={() =>
                                                                                handelCopied(
                                                                                    key.key
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
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`${
                                                                        key.status ===
                                                                        "inactive"
                                                                            ? "bg-yellow-400"
                                                                            : key.status ===
                                                                              "active"
                                                                            ? "bg-green-400 px-[28.5px]"
                                                                            : "bg-red-400 px-[25.5px]"
                                                                    } rounded-lg px-5 py-2 text-white`}
                                                                >
                                                                    {key.status}
                                                                </span>{" "}
                                                            </td>
                                                            <td>
                                                                {key.procurement_date
                                                                    ? key.procurement_date
                                                                    : "N/A"}
                                                            </td>
                                                            <td>
                                                                {key.expiry_date
                                                                    ? key.expiry_date
                                                                    : "N/A"}
                                                            </td>
                                                            <td
                                                                className="relative"
                                                                id={key.key_tag}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24"
                                                                    fill="currentColor"
                                                                    className="w-6 h-6 cursor-pointer relative"
                                                                    onClick={() =>
                                                                        handleImageClick(
                                                                            key.key_tag
                                                                        )
                                                                    }
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                {key.key_tag ===
                                                                    selectedkeyTag && (
                                                                    <div className="absolute top-5 right-5 bg-[#121b33] text-white rounded-lg w-[80%] z-50">
                                                                        <button
                                                                            className="block text-white py-2 hover:bg-[#000000] rounded-md w-full"
                                                                            onClick={() =>
                                                                                handleRevokeAccessKey(
                                                                                    key.key_tag
                                                                                )
                                                                            }
                                                                        >
                                                                            Revoke
                                                                        </button>
                                                                        <button
                                                                            className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
                                                                            onClick={() =>
                                                                                handleDeleteInactiveAccessKey(
                                                                                    key.key_tag
                                                                                )
                                                                            }
                                                                        >
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                )
                                            )}
                                        {keys && keys.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan={7}
                                                    className="text-center"
                                                >
                                                    No keys available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </main>
                )}

                <Footer />
            </div>
        </>
    );
};

export default ManageKeys;
