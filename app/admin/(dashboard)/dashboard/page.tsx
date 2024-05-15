"use client";

import { useEffect, useState } from "react";
import PieChart from "@/charts/PieChart";
import SchoolStatistics from "@/components/SchoolStatistics";
import AnalyticsIllustration from "@/public/Report-rafiki.svg";
import Image from "next/image";

const Dashbaord = () => {
    const [_isLoading, _setisLoading] = useState(true);
    const [showChart, setShowChart] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowChart(false);
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    const loadingUI = (
        <div className="flex justify-center items-center">
            <span className="loading loading-ring loading-lg h-[70vh] px-[10%] bg-green-400"></span>
        </div>
    );

    return (
        <>
            <div className="container pb-12 h-[90dvh]">
                <h1 className="font-bold text-3xl mb-8 px-8 text-[#393b3f]">
                    {" "}
                    Welcome to Access Portal&apos;s Admin Panel{" "}
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                </h1>
                {/* Analytics on user Access Keys */}
                {showChart ? (
                    loadingUI
                ) : (
                    <>
                        <div className="grid grid-cols-3 grid-rows-1 px-10 h-[90%]">
                            <div className="border-r-2 border-[#393b3f]">
                                <div className="flex flex-col items-center justify-center h-[100%]">
                                    <div className="border-[#393b3f] h-[40%]">
                                        {/* info about admin */}
                                        <Image
                                            src={AnalyticsIllustration}
                                            alt="analytics illustration"
                                            height={100}
                                            width={100}
                                            className="h-[100%] w-[100%]"
                                        />
                                    </div>
                                    <>
                                        <SchoolStatistics />
                                    </>
                                </div>
                            </div>
                            <div className="col-span-2 w-[100%] flex flex-col justify-center items-center px-4">
                                <div className="flex flex-col justify-center items-center w-[70%]">
                                    <h1 className="font-bold text-2xl mb-4 px-8 text-[#393b3f]">
                                        Key Status Distribution
                                    </h1>

                                    <PieChart />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Dashbaord;
