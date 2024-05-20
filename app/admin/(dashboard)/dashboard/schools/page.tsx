/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Paginator from "@/components/Paginator";

interface SchoolsInfoType {
    full_name: string;
    email: string;
    phone: string;
    is_active: boolean;
    created_at: string;
}

interface ResponseOptionsType {
    next: string;
    previous: string;
}

const baseURl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Schools = () => {
    const [schoolsInfo, setSchoolsInfo] = useState<SchoolsInfoType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrevious, setDisablePrevious] = useState(false);
    const accessToken = Cookies.get("access-token");
    const [responseOptions, setResponseOptions] =
        useState<ResponseOptionsType>();

    useEffect(() => {
        fetchSchoolsInfo();
    }, []);

    const fetchSchoolsInfo = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURl}/admin/schools/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSchoolsInfo(data.results);
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
            } else {
                toast.error("Failed to fetch data");
            }
        } catch (error) {
            toast.error("Failed to fetch data");
        }
        setIsLoading(false);
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
                setSchoolsInfo(data.results);
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
                setSchoolsInfo(data.results);
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
            }
        } catch (error) {}
        setIsLoading(false);
    };

    return (
        <>
            <div className="container pb-12 h-[90dvh] px-8">
                <div className="font-bold text-3xl mb-3 text-[#393b3f]">
                    <span className="flex flex-row items-center gap-4">
                        {" "}
                        Registered School&apos;s Info{" "}
                        <span title="List of all active school accounts excluding admins!">
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
                <main>
                    <div className="overflow-x-auto h-[70dvh]">
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <span className="loading loading-ring loading-lg h-[70vh] px-[10%] bg-green-400"></span>
                            </div>
                        ) : schoolsInfo.length === 0 ? (
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th title="Schools that have an active account to request for an Access Key!">
                                            Active Account
                                        </th>
                                        <th>Joined At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {schoolsInfo?.map((school, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{school.full_name}</td>
                                            <td>{school.email}</td>
                                            <td>{school.phone}</td>
                                            <td>
                                                {school.is_active !== true ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M6 18 18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="m4.5 12.75 6 6 9-13.5"
                                                        />
                                                    </svg>
                                                )}
                                            </td>
                                            <td>{school.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </main>
                {setSchoolsInfo?.length !== 0 && (
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

export default Schools;
