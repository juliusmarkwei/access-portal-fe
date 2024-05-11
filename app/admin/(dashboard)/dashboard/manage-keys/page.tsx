"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface SchoolKeysInfo {
    owner: string;
    key_tag: string;
    validity_duration_days: number;
    status: string;
    procurement_date: string;
    expiry_date: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const AdminManageKeys = () => {
    const [schoolKeysInfo, setSchoolKeysInfo] = useState<SchoolKeysInfo[]>();
    const [selectedSchoolKeyTag, setSelectedSchoolKeyTag] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const accessToken = Cookies.get("access-token");

    useEffect(() => {
        handleGetSchoolKeysInfo();
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
                setSchoolKeysInfo(data);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleImageClick = (keyTag: string) => {
        setSelectedSchoolKeyTag(keyTag);
    };

    const handleRevokeAccessKey = async (owner: string) => {
        {
        }
    };

    const handleActivateAccessKey = async (owner: string) => {};

    return (
        <>
            <div className="container py-12 h-[90dvh] px-8">
                <h1 className="font-bold text-3xl mb-8 text-[#393b3f]">
                    {" "}
                    Manage School&apos;s Access Keys{" "}
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                </h1>
                <main>
                    <div className="overflow-x-auto h-[62dvh]">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <span className="loading loading-ring loading-lg h-[62vh] px-[10%] bg-green-400"></span>
                            </div>
                        ) : schoolKeysInfo?.length === 0 ? (
                            <div className="flex justify-center items-center h-[62vh]">
                                <span className="text-[#2f2f37]">
                                    No data available
                                </span>
                            </div>
                        ) : (
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
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
                                            <th>{index}</th>
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
                                            <td>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-6 h-6 cursor-pointer relative"
                                                    onClick={() =>
                                                        handleImageClick(
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
                                                    <div className="absolute top-5 right-5 bg-[#121b33] text-white rounded-lg w-[80%] z-50">
                                                        <button
                                                            className="block text-white py-2 hover:bg-[#000000] rounded-md w-full"
                                                            onClick={() =>
                                                                handleRevokeAccessKey(
                                                                    schoolKey.owner
                                                                )
                                                            }
                                                        >
                                                            Revoke
                                                        </button>
                                                        <button
                                                            className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
                                                            onClick={() =>
                                                                handleActivateAccessKey(
                                                                    schoolKey.owner
                                                                )
                                                            }
                                                        >
                                                            Delete
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
                {!isLoading && schoolKeysInfo?.length !== 0 && (
                    <footer>
                        <div className="join flex justify-center items-center py-2">
                            <button className="join-item btn btn-xs">1</button>
                            <button className="join-item btn btn-xs btn-active">
                                2
                            </button>
                            <button className="join-item btn btn-xs">3</button>
                            <button className="join-item btn btn-xs">4</button>
                        </div>
                    </footer>
                )}
            </div>
        </>
    );
};

export default AdminManageKeys;
