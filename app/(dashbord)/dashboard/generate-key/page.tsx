"use client";

import React from "react";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import LaptopLock from "@/public/laptop lock new.png";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const GenerateKey = () => {
    const [formData, setFormData] = useState({
        key_tag: "",
        validity_duration_days: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [accessKeyData, setAccessKeyData] = useState({});
    const access_token = Cookies.get("access_token");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const showKeyCreatedModal = () => {
        const modal = document.getElementById(
            "my_modal_8"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
            console.log("hereeeee");
        }
    };

    const createAccessKey = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/access-key/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${access_token}`,
                },
                body: JSON.stringify({
                    key_tag: formData.key_tag,
                    validity_duration_days: formData.validity_duration_days,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setAccessKeyData(data);
                setFormData({ key_tag: "", validity_duration_days: "" });
                setIsLoading(false);
                showKeyCreatedModal();
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong, try again!");
            setIsLoading(false);
        }
    };

    const disablebtn = () => {
        return (
            formData.key_tag === "" || formData.validity_duration_days === ""
        );
    };
    return (
        <>
            <div className="container py-12 px-8 flex flex-col max-h-screen">
                <main className="h-[60vh] flex-grow">
                    <div className="flex flex-row font-bold text-3xl text-[#393b3f]">
                        Generate Key
                    </div>
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                    <h3 className="text-lg my-7 text-[#393b3f]">
                        Fill in key detail
                    </h3>
                    <div className="flex flex-wrap">
                        <form
                            className="w-full md:w-1/2"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <label className="input input-bordered flex items-center gap-2 mx-auto border-2 border-[#121b33]">
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
                                    name="key_tag"
                                    onChange={handleOnChange}
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
                                    name="validity_duration_days"
                                    onChange={handleOnChange}
                                />
                            </label>
                            <button
                                className={`flex justify-center items-center mt-10 ml-[30%] w-[150px] h-[55px] border-2 border-[#121b33] text-[#121b33] rounded-md hover:bg-[#121b33] hover:text-white ${
                                    isLoading
                                        ? "cursor-not-allowed bg-[#121b33]"
                                        : ""
                                }`}
                                disabled={disablebtn() || isLoading}
                                onClick={createAccessKey}
                            >
                                {isLoading ? (
                                    <TailSpin
                                        color="#46efa9"
                                        width={50}
                                        radius={5}
                                        height={40}
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                        <Image
                            src={LaptopLock}
                            alt="laptop lock"
                            width={50}
                            height={50}
                            sizes=""
                            className="w-[30%] h-[30%] pb-20"
                        />
                    </div>
                </main>
            </div>
            <Footer />

            {/* Put this part before </body> tag */}
            <div className="modal" role="dialog" id="my_modal_8">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">This modal works with anchor links</p>
                    <div className="modal-action">
                        <a href="#" className="btn">
                            Yay!
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenerateKey;
