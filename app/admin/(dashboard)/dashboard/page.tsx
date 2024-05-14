"use client";

import { useEffect, useState } from "react";
import PieChart from "@/charts/PieChart";
import BarChart from "@/charts/BarChart";

const Dashbaord = () => {
    const [_isLoading, _setisLoading] = useState(true);
    const [showChart, setShowChart] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setShowChart(false);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    const loadingUI = (
        <div className="flex justify-center items-center">
            <span className="loading loading-ring loading-lg h-[70vh] px-[10%] bg-green-400"></span>
        </div>
    );

    return (
        <>
            <div className="container py-12 h-[90dvh]">
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
                        <div className="grid grid-cols-2 grid-rows-1 gap-5 px-10 h-[90%]">
                            <div className="rounded-lg border-2 border-green-300 stats">
                                <PieChart />
                            </div>
                            <div className="rounded-lg border-2 border-green-300">
                                <BarChart />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Dashbaord;
