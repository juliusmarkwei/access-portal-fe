"use client";

import StatusIndicator from "@/components/StatusIndicator";
import { useEffect, useState } from "react";
import {
    Chart,
    Colors,
    BarController,
    CategoryScale,
    LinearScale,
    BarElement,
    Legend,
} from "chart.js";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface KeysInfoType {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
    created_at: string;
}

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const Dashbaord = () => {
    const [isLoading, setisLoading] = useState(false);
    const [_isLoading, _setisLoading] = useState(false);
    const [keysInfo, setKeysInfo] = useState<KeysInfoType[]>([]);
    const accessToken = Cookies.get("access-token");

    useEffect(() => {
        getKeysInfo();
        percentageDifferenceLastYear();
        getLastAccessKeyCreationDate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getKeysInfo = async () => {
        _setisLoading(true);
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
                setKeysInfo(data);
                _setisLoading(false);
            } else {
                toast.error("Failed to fetch data");
                _setisLoading(false);
            }
        } catch (error) {
            toast.error("Failed to fetch data");
            _setisLoading(false);
        }
    };

    const calculateTotalKeys = () => keysInfo.length;

    // percentage difference of the keys generated last year and this year
    const percentageDifferenceLastYear = () => {
        let thisYear = new Date().getFullYear();
        let lastYear = thisYear - 1;

        // Filter keys generated in last year and this year
        let keysGeneratedThisYear = keysInfo.filter((key) => {
            let keyYear = new Date(key.created_at).getFullYear();
            return keyYear === thisYear;
        });

        let keysGeneratedLastYear = keysInfo.filter((key) => {
            let keyYear = new Date(key.created_at).getFullYear();
            return keyYear === lastYear;
        });

        // Calculate the percentage of keys generated this year and last year
        let percentageThisYear =
            (keysGeneratedThisYear.length / keysInfo.length) * 100;
        let percentageLastYear =
            (keysGeneratedLastYear.length / keysInfo.length) * 100;

        // Calculate the percentage difference
        let percentageDifference = percentageThisYear - percentageLastYear;

        return percentageDifference;
    };

    const keyStatusLabels = keysInfo.map((key: KeysInfoType) => key.status);

    const keyStatusCounts = keyStatusLabels.reduce(
        (acc: { [key: string]: number }, key) => {
            const count = keysInfo.filter(
                (keyInfo) => keyInfo.status === key
            ).length;
            acc[key] = count;
            return acc;
        },
        {}
    );

    Chart.register(
        Colors,
        BarController,
        CategoryScale,
        LinearScale,
        BarElement,
        Legend
    );
    const barChartData = {
        labels: keyStatusLabels,
        datasets: [
            {
                label: "Key Statuses Count",
                data: keyStatusCounts,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(20, 205, 16, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgba(20, 205, 16, 40)",
                    "rgb(75, 192, 192)",
                ],
                borderWidth: 2,
            },
        ],
    };

    const barChartOptions: any = {
        type: "bar",
        data: barChartData,
        options: {
            scales: {
                y: {
                    type: "linear",
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        callback: function (
                            value: number,
                            index: number,
                            values: number
                        ) {
                            return value; // Return the value as is
                        },
                        font: {
                            size: 15,
                            weight: "bold",
                        },
                    },
                },
                x: {
                    type: "category",
                    labels: keyStatusLabels,
                    ticks: {
                        font: {
                            size: 15,
                            weight: "bold",
                        },
                    },
                },
            },
        },
    };

    if (typeof window !== "undefined") {
        const chartElement = document.getElementById(
            "barChart"
        ) as HTMLCanvasElement;

        if (chartElement) {
            // Check if a chart already exists on the canvas
            if (Chart.getChart(chartElement)) {
                // Destroy the existing chart
                Chart.getChart(chartElement)?.destroy();
            }

            // Create a new chart instance
            new Chart(chartElement, barChartOptions);
        }
    }

    const getLastAccessKeyCreationDate = () => {
        const sortedKeys = keysInfo.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime(); // Convert to timestamp
            const dateB = new Date(b.created_at).getTime(); // Convert to timestamp
            return dateB - dateA; // Compare timestamps
        });

        const lastAccessKeyCreationDate =
            sortedKeys.length > 0 ? sortedKeys[0].created_at : null;
        return lastAccessKeyCreationDate;
    };

    const loadingUI = (
        <div className="flex justify-center items-center">
            <span className="loading loading-ring loading-lg h-[70vh] px-[10%] bg-green-400"></span>
        </div>
    );

    return (
        <>
            <StatusIndicator
                isLoading={isLoading}
                setIsLoading={setisLoading}
            />
            <div className="container py-12 h-[90dvh] mt-[30px]">
                <h1 className="font-bold text-3xl mb-8 px-8 text-[#393b3f]">
                    {" "}
                    Welcome to Access Portal{" "}
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                </h1>
                {/* Analytics on user Access Keys */}

                <div className="grid grid-cols-3 grid-rows-2 gap-5 px-10 h-[84%]">
                    <div className="rounded-lg border-2 border-green-300 stats shadow">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block w-8 h-8 stroke-current text-green-500 hover:text-green-700 transition-colors duration-500 ease-in-out"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title">
                                Total key generated
                            </div>
                            <div className="stat-value text-secondary">
                                {calculateTotalKeys() > 0
                                    ? calculateTotalKeys()
                                    : "Zero"}
                                {`${
                                    calculateTotalKeys() > 1 ? " keys" : " key"
                                }`}
                            </div>
                            <div className="stat-desc">
                                {`${
                                    percentageDifferenceLastYear() > 0
                                        ? percentageDifferenceLastYear()
                                        : 0
                                }% more than last year`}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border-2 border-green-300 row-span-2 col-span-2">
                        <canvas id="barChart" className="p-8"></canvas>
                    </div>
                    <div className="rounded-lg border-2 border-green-300">
                        <div className="stat">
                            <div className="stat-figure text-orange-300 hover:text-orange-400 transition-colors duration-500 ease-in-out py-14">
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
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <div className="stat-title">
                                Previous key created at
                            </div>
                            <div className="font-bold text-[2rem] h-[100px] flex items-center">
                                {getLastAccessKeyCreationDate() === null
                                    ? "Not availble"
                                    : getLastAccessKeyCreationDate()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashbaord;
