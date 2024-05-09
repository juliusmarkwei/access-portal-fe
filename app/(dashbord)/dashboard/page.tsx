"use client";

import StatusIndicator from "@/components/StatusIndicator";
import { useEffect, useState } from "react";
import { Chart } from "chart.js";
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
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        getKeysInfo();
        percentageDifferenceLastYear();
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

    const calculateTotalKeys = keysInfo.length;

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
                <div className="grid grid-cols-2 grid-rows-2 gap-5 px-10 h-[84%]">
                    <div className="rounded-lg border-4 border-green-300 stats shadow">
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
                                {calculateTotalKeys > 0
                                    ? calculateTotalKeys
                                    : 0}
                                {`${calculateTotalKeys > 1 ? " keys" : " key"}`}
                            </div>
                            <div className="stat-desc">
                                {`${percentageDifferenceLastYear()}% more than last year`}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border-4 border-green-300"></div>
                    <div className="rounded-lg border-4 border-green-300"></div>
                    <div className="rounded-lg border-4 border-green-300"></div>
                </div>
            </div>
        </>
    );
};

export default Dashbaord;
