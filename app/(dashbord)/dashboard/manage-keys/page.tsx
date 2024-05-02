"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface KeysProps {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
    validity_duration_days: string;
}

const ManageKeys = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [keys, setKeys] = useState<string[]>();
    const access_token = Cookies.get("access_token");

    useEffect(() => {
        loadKeys();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadKeys = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/access-key/`, {
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
    return (
        <div className="container py-12 px-8">
            <div className="flex flex-row font-bold text-3xl text-[#393b3f]">
                Manage Keys
            </div>
            <hr className="mt-3 border-b-2 border-[#2f2f37]" />
            <main className="mt-10 w-full h-full">
                {isLoading ? (
                    <progress className="progress w-56"></progress>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Key Tag</th>
                                    <th>Key</th>
                                    <th>Status</th>
                                    <th>Procurement Date</th>
                                    <th>Expiry Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {keys &&
                                    keys.map((key: any, index: number) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <th>{index + 1}</th>
                                                <td>{key.key_tag}</td>
                                                <td>
                                                    <span
                                                        className={`${
                                                            key.status ===
                                                            "inactive"
                                                                ? ""
                                                                : "cursor-not-allowed"
                                                        } border-[1px] bg-gray-200 border-[#d7d1d1] rounded-lg px-2 py-1`}
                                                    >
                                                        {key.key}
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
                                                                ? "bg-green-400"
                                                                : "bg-red-400"
                                                        } border-1 border-black rounded-lg px-2 py-1 text-white`}
                                                    >
                                                        {key.status}
                                                    </span>{" "}
                                                </td>
                                                <td>{key.procurement_date}</td>
                                                <td>
                                                    {key.expiry_date
                                                        ? key.expiry_date
                                                        : "---"}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ManageKeys;
