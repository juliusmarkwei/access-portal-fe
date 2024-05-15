"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const SchoolStatistics = () => {
    const [schoolCount, setSchoolCount] = useState<number>(0);
    const [newUsersStatistics, setNewUsersStatistics] = useState({
        counts: null,
        percentageIncrease: null,
    });
    const accessToken = Cookies.get("access-token");

    useEffect(() => {
        fetchSchoolsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchSchoolsData = async () => {
        try {
            const response = await fetch(`${baseURL}/admin/schools/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const currentDate = new Date();
            const lastMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1
            );

            // Filter schools that joined last month
            const schoolsJoinedLastMonth = data.results.filter((school) => {
                const createdAtDate = new Date(school.created_at);
                return createdAtDate > lastMonth;
            });

            setSchoolCount(data.results.length);
            const totalSchools = data.results.length;
            const schoolsJoinedLastMonthCount = schoolsJoinedLastMonth.length;
            const percentageIncrease =
                (schoolsJoinedLastMonthCount / totalSchools) * 100;

            setNewUsersStatistics({
                counts: schoolsJoinedLastMonthCount,
                percentageIncrease: percentageIncrease.toFixed(2), // Limit to two decimal places
            });
        } catch (error) {
            toast.error("Error fetching school data:", error);
        }
    };

    return (
        <>
            <div className="stat h-[30%]">
                <div className="stat-figure text-orange-400 hover:text-orange-500 transition-colors duration-500 ease-in-out ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current "
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title">Total Registered</div>
                <div className="stat-value">
                    {schoolCount && schoolCount.toString().padStart(4, "0")}
                </div>
                <div className="stat-desc">↗︎ 22%</div>
            </div>
            <div className="stat h-[30%]">
                <div className="stat-figure text-green-400 hover:text-green-500 transition-colors duration-500 ease-in-out">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title">New Registers</div>
                <div className="stat-value">
                    {newUsersStatistics.counts &&
                        newUsersStatistics.counts?.toString().padStart(4, "0")}
                </div>
                <div className="stat-desc">
                    ↗︎{" "}
                    {newUsersStatistics.percentageIncrease &&
                        newUsersStatistics?.percentageIncrease}
                    %
                </div>
            </div>
        </>
    );
};

export default SchoolStatistics;
