/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import StatusIndicator from "@/components/StatusIndicator";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import BarChart from "@/charts/BarChart";
import DashboradTotalKeys from "@/components/DashboradTotalKeys";
import DashboaardLastKeyCreationDate from "@/components/DashboaardLastKeyCreationDate";

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
    const [showChart, setShowChart] = useState(true);
    const accessToken = Cookies.get("access-token");

    useEffect(() => {
        getKeysInfo();

        const intervalId = setInterval(() => {
            setShowChart(false);
        }, 1200);

        return () => clearInterval(intervalId);
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
                setKeysInfo(data.results);
            } else {
                toast.error("Failed to fetch data");
            }
        } catch (error) {
            toast.error("Failed to fetch data");
        }
        _setisLoading(false);
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
                {showChart ? (
                    loadingUI
                ) : (
                    <div className="grid grid-cols-3 grid-rows-2 gap-5 px-10 h-[84%]">
                        <div className="rounded-lg border-2 border-green-300 stats shadow">
                            <DashboradTotalKeys
                                getKeysInfo={getKeysInfo}
                                keysInfo={keysInfo}
                            />
                        </div>
                        <div className="rounded-lg border-2 border-green-300 row-span-2 col-span-2 flex justify-center items-center">
                            <BarChart keysInfo={keysInfo} />
                        </div>
                        <div className="rounded-lg border-2 border-green-300">
                            <DashboaardLastKeyCreationDate
                                keysInfo={keysInfo}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashbaord;
