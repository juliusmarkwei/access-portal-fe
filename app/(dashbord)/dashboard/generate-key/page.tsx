"use client";

import React from "react";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import LaptopLock from "@/public/laptop lock new.png";

const GenerateKey = () => {
    return (
        <div className="container py-12 px-8 flex flex-col max-h-screen">
            <main className="mb-[-50px] max-h-[80%] flex-grow">
                <div className="flex flex-row font-bold text-3xl text-[#393b3f]">
                    Generate Key
                </div>
                <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                <div className="flex flex-wrap mt-10">
                    <form
                        className="w-full md:w-1/2"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h3 className="text-lg py-3 text-[#393b3f]">
                            Fill in key detail
                        </h3>
                        <label className="input input-bordered flex items-center gap-2 mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Key tag"
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mt-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Validity days"
                            />
                        </label>
                        <button className="mt-10 ml-[30%] w-[150px] h-[55px] border-2 border-[#121b33] text-[#121b33] rounded-md hover:bg-[#121b33] hover:text-white">
                            Submit
                        </button>
                    </form>
                    <Image
                        src={LaptopLock}
                        alt="laptop lock"
                        width={200}
                        height={200}
                        className="w-full md:w-1/2"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GenerateKey;
