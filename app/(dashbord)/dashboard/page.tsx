"use client";

import StatusIndicator from "@/components/StatusIndicator";
import { useState } from "react";

const Dashbaord = () => {
    const [isLoading, setisLoading] = useState(false);
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
                    <div className="rounded-lg border-4 border-green-300"></div>
                    <div className="rounded-lg border-4 border-green-300"></div>
                    <div className="rounded-lg border-4 border-green-300"></div>
                    <div className="rounded-lg border-4 border-green-300"></div>
                </div>
            </div>
        </>
    );
};

export default Dashbaord;
