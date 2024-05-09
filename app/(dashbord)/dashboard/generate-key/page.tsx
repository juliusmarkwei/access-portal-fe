"use client";

import React from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import LaptopLock from "@/public/7191133_3573407.svg";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import StatusIndicator from "@/components/StatusIndicator";
import InputUI from "@/components/InputUI";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const GenerateKey = () => {
    const [formData, setFormData] = useState({
        key_tag: "",
        validity_duration_days: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [_isLoading, _setIsLoading] = useState(false);
    const access_token = Cookies.get("access_token");

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const showKeyCreatedModal = () => {
        const modal = document.getElementById(
            "my_modal_1"
        ) as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const createAccessKey = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${baseURL}/access-key/`, {
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
                setFormData({ key_tag: "", validity_duration_days: "" });
                setIsLoading(false);
                showKeyCreatedModal();
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
                setFormData({ key_tag: "", validity_duration_days: "" });
                setIsLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong, try again!");
            console.log(error);
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
            <StatusIndicator
                isLoading={_isLoading}
                setIsLoading={_setIsLoading}
            />
            <div className="container py-12 px-8 mt-[30px] flex flex-col h-[76dvh]">
                <main className="h-[60vh]">
                    <div className="flex flex-row font-bold text-3xl text-[#393b3f]">
                        Generate Key
                    </div>
                    <hr className="mt-3 border-b-2 border-[#2f2f37]" />
                    <h3 className="text-lg my-7 text-[#393b3f]">
                        Fill in key detail
                    </h3>
                    <div className="flex flex-wrap">
                        <form className="w-full md:w-1/2">
                            <InputUI
                                handleOnChange={handleOnChange}
                                formDataProperty={formData.key_tag}
                                inputType="text"
                                inputName="key_tag"
                                svg={
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
                                            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 6h.008v.008H6V6Z"
                                        />
                                    </svg>
                                }
                            />
                            <InputUI
                                handleOnChange={handleOnChange}
                                formDataProperty={
                                    formData.validity_duration_days
                                }
                                inputType="number"
                                inputName="validity_duration_days"
                                svg={
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
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                                        />
                                    </svg>
                                }
                            />

                            <button
                                className={`flex justify-center items-center mt-10 ml-[30%] w-[150px] h-[55px] border-2 border-[#121b33] text-[#121b33] transition ease-in rounded-md hover:bg-[#121b33] hover:text-white ${
                                    isLoading
                                        ? "cursor-not-allowed bg-[#121b33]"
                                        : ""
                                }`}
                                disabled={disablebtn() || isLoading}
                                onClick={(e) => createAccessKey(e)}
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
                            className="w-[30%] h-[30%] ml-[10%]"
                        />
                    </div>
                </main>
            </div>
            <span className="">
                <Footer />
            </span>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">
                        Access Key Created
                    </h3>
                    <p className="mb-4">
                        Your access key has been successfully created. Please
                        wait for an admin to activate it. Once activated,
                        you&apos;ll be notified via email.
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default GenerateKey;
