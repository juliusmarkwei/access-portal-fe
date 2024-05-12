"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Paginator from "@/components/Paginator";

interface SchoolKeysInfoType {
    owner: string;
    key_tag: string;
    validity_duration_days: number;
    status: string;
    procurement_date: string;
    expiry_date: string;
}

interface ResponseOptionsType {
    next: string;
    previous: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const AdminManageKeys = () => {
    const [schoolKeysInfo, setSchoolKeysInfo] =
        useState<SchoolKeysInfoType[]>();
    const [responseOptions, setResponseOptions] =
        useState<ResponseOptionsType>();
    const [selectedSchoolKeyTag, setSelectedSchoolKeyTag] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [_isLoading, _setIsLoading] = useState(false);
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(false);
    const accessToken = Cookies.get("access-token");
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Check if selectedkeyTag is truthy and the target is not inside a td element
            const sanitizedTag = selectedSchoolKeyTag.replace(/\s+/g, ""); // Remove whitespace
            if (
                selectedSchoolKeyTag &&
                !(
                    e.target instanceof HTMLElement &&
                    e.target.closest(sanitizedTag) &&
                    e.target.closest("td")
                )
            ) {
                setSelectedSchoolKeyTag("");
            }
        };

        document.addEventListener("click", handleClickOutside);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [selectedSchoolKeyTag]);

    useEffect(() => {
        handleGetSchoolKeysInfo();
        setSelectedSchoolKeyTag("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetSchoolKeysInfo = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/admin/access-key/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSchoolKeysInfo(data.results);
                setResponseOptions({
                    next: data.next,
                    previous: data.previous,
                });
                if (data.next === null) {
                    setDisableNext(true);
                }
                if (data.previous === null) {
                    setDisablePrevious(true);
                }
            }
        } catch (error) {}
        setIsLoading(false);
    };

    const handleOptionClick = (keyTag: string) => {
        setSelectedSchoolKeyTag(keyTag);
    };

    const handleRevokeAccessKey = async (owner: string, keyTag: string) => {
        _setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/admin/access-key/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
                body: JSON.stringify({ email: owner, key_tag: keyTag }),
            });
            if (response.ok) {
                handleGetSchoolKeysInfo();
                router.refresh();
                toast.success(`Access Key ${selectedSchoolKeyTag} revoked!`, {
                    duration: 4000,
                });
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
            }
        } catch (error) {
            toast.error("An error occurred", { duration: 4000 });
        }
        _setIsLoading(false);
    };

    const handleActivateAccessKey = async (owner: string, keyTag: string) => {
        _setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/admin/access-key/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
                body: JSON.stringify({ email: owner, key_tag: keyTag }),
            });
            if (response.ok) {
                handleGetSchoolKeysInfo();
                router.refresh();
                toast.success(`Access Key ${selectedSchoolKeyTag} activated!`, {
                    duration: 4000,
                });
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
            }
        } catch (error) {
            toast.error("An error occurred", { duration: 4000 });
        }
        _setIsLoading(false);
        setSelectedSchoolKeyTag("");
    };

    const handlePreviousPage = async () => {
        if (!responseOptions?.previous) return;
        setIsLoading(true);
        try {
            const response = await fetch(responseOptions?.previous, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSchoolKeysInfo(data.results);
                setResponseOptions({
                    next: data.next,
                    previous: data.previous,
                });
                if (data.next === null) {
                    setDisableNext(true);
                } else {
                    setDisableNext(false);
                }
                if (data.previous === null) {
                    setDisablePrevious(true);
                } else {
                    setDisablePrevious(false);
                }
                console.log(disableNext, disablePrevious);
            }
        } catch (error) {}
        setIsLoading(false);
    };

    const handleNextPage = async () => {
        if (!responseOptions?.next) return;
        setIsLoading(true);
        try {
            const response = await fetch(responseOptions?.next, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSchoolKeysInfo(data.results);
                setResponseOptions({
                    next: data.next,
                    previous: data.previous,
                });
                if (data.next === null) {
                    setDisableNext(true);
                } else {
                    setDisableNext(false);
                }
                if (data.previous === null) {
                    setDisablePrevious(true);
                } else {
                    setDisablePrevious(false);
                }
                console.log(disableNext, disablePrevious);
            }
        } catch (error) {}
        setIsLoading(false);
    };

    return (
        <>
            <div className="container pb-12 h-[90dvh] px-8">
                <h1 className="font-bold text-3xl mb-3 text-[#393b3f]">
                    {" "}
                    Manage School&apos;s Access Keys{" "}
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                </h1>
                <main>
                    <div className="overflow-x-auto h-[70dvh]">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <span className="loading loading-ring loading-lg h-[70vh] px-[10%] bg-green-400"></span>
                            </div>
                        ) : schoolKeysInfo?.length === 0 ? (
                            <div className="flex justify-center items-center h-[70vh]">
                                <span className="text-[#2f2f37]">
                                    No data available
                                </span>
                            </div>
                        ) : (
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr className="sticky top-0 bg-[#121b33] text-white border-2 rounded-xl border-[#121b33]">
                                        <th></th>
                                        <th>School Email</th>
                                        <th>Key Tag</th>
                                        <th>Status</th>
                                        <th>Active Days</th>
                                        <th>Date of Procurement</th>
                                        <th>Expiry Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {schoolKeysInfo?.map((schoolKey, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{schoolKey.owner}</td>
                                            <td>{schoolKey.key_tag}</td>
                                            <td className="w-[20px]">
                                                <span
                                                    className={`${
                                                        schoolKey.status ===
                                                        "inactive"
                                                            ? "bg-yellow-400"
                                                            : schoolKey.status ===
                                                              "active"
                                                            ? "bg-green-400 px-[25px]"
                                                            : "bg-red-400 "
                                                    } rounded-lg px-5 py-2 text-white`}
                                                >
                                                    {schoolKey.status}
                                                </span>{" "}
                                            </td>
                                            <td>
                                                {
                                                    schoolKey.validity_duration_days
                                                }
                                            </td>
                                            <td>
                                                {schoolKey.procurement_date
                                                    ? schoolKey.procurement_date
                                                    : "N/A"}
                                            </td>
                                            <td>
                                                {schoolKey.expiry_date
                                                    ? schoolKey.expiry_date
                                                    : "N/A"}
                                            </td>
                                            <td
                                                className="relative"
                                                id={selectedSchoolKeyTag}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-6 h-6 cursor-pointer relative"
                                                    onClick={() =>
                                                        handleOptionClick(
                                                            schoolKey.key_tag
                                                        )
                                                    }
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {schoolKey.key_tag ===
                                                    selectedSchoolKeyTag && (
                                                    <div className="absolute top-5 right-5 bg-[#121b33] text-white rounded-lg w-[100px] z-50">
                                                        <button
                                                            className="block text-white py-2 hover:bg-[#000000] rounded-md w-full"
                                                            onClick={() =>
                                                                handleRevokeAccessKey(
                                                                    schoolKey.owner,
                                                                    schoolKey.key_tag
                                                                )
                                                            }
                                                        >
                                                            Revoke
                                                        </button>
                                                        <button
                                                            className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
                                                            onClick={() =>
                                                                handleActivateAccessKey(
                                                                    schoolKey.owner,
                                                                    schoolKey.key_tag
                                                                )
                                                            }
                                                        >
                                                            Activate
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
                {schoolKeysInfo?.length !== 0 && (
                    <footer className="pt-4">
                        <Paginator
                            disableNext={disableNext}
                            disablePrevious={disablePrevious}
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                        />
                    </footer>
                )}
            </div>
        </>
    );
};

export default AdminManageKeys;
