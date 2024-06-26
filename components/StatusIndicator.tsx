/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface KeysType {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
}

interface StatusIndicatorProps {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    SearchUI?: FC;
}

const StatusIndicator = ({
    isLoading,
    setIsLoading,
    SearchUI,
}: StatusIndicatorProps) => {
    const [keys, setKeys] = useState<KeysType[]>();
    const access_token = Cookies.get("access-token");
    const pathName = usePathname();
    const _manageKeys = pathName.includes("manage-keys");

    useEffect(() => {
        loadKeys();
    }, []);

    const loadKeys = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/access-key/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${access_token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setKeys(data.results);
            } else {
                const data = await response.json();
                toast.error(data.error, { duration: 4000 });
            }
        } catch (error) {
            toast.error("An error occured", { duration: 4000 });
        }
        setIsLoading(false);
    };
    return (
        <>
            <div className="flex mx-8 justify-center items-center mt-[-30px] mb-[-40px]">
                <span className="flex-grow">
                    {SearchUI && (
                        <span className="mr-[64%]">
                            <SearchUI />
                        </span>
                    )}
                </span>
                <Link
                    href={`${baseURL}/`}
                    className={`${_manageKeys ? "pb-[32px]" : ""}`}
                >
                    <Image
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAAAgICAhHyC1tbUXFxcJCQmZmZnU1NQVExTR0dFqamoFAAB1dXUTExMbGxv39/fo6OhYWFg4ODje3t7FxcWIiIiCgoKkoqOqqqru7u7i4uIRDhD5+flHR0e2trZAQEAzMzNQUFBjY2PAvr+Uk5QnJyd2dHVVVVU2NjYnJCZ06P9MAAADqUlEQVR4nO3dbVOyQBSH8d1FVk0FH/IZCyu1+v4f8EZshi3R6j7nxJn6/142tdM1wAq6oDEAAAAAAAAAAAAAAAAAAAAAAAAAAADM1rc0m6YDrlvNtmnSpcgeVk1HXNPZ+9S5iCTLh01nXDaKY+fSmCAtErtbvYmHLHL2bkyQHxOzO6076spGkV2Shlj2I82JUxt1H2lDLMrCyCudblrW+TZtiKLQbb0rtqLKY/GepbDfmhd7ezbRmMizDYsjeVAkdnOFOypboZlbFyUKpxu+wjJR4YzKWGjKY1FdImdheSwm2k7gWAtP042yEzjewnJHVTajMhcqPBa5C8tEVS8a7IXqXjT4C087qp4ZVaDwNN2oOUeVKDwmOjUzqkihqhlVplBTolDh6QROxSWxVGH5otF9UZAoVqjmkpin0C9qfq7kWGQofLJRWnvEzbyGEziGwuHxiMvvp+fuUgVbkaHQtIvdMbXn+unprWKWf/S/fShctWfXdeoG6dmixZ15+9jG1v7Nj/lQOLbZVd6O6kbZRTZLzhz/oEi3Nz8VU+t94XCfnm+Kdy78u6PWbF4rT5Vtw1nN4fTOd6+KDpmyQtOpmRJD3/08+9DVVsht0HW/vTBBoTQUUqFQHgqpUCgPhVQolPehcN17pixxOxkE71uoK8w9ZZXiGxssI9NWuPn0Cvgr4rwaX1uhWXx2BfwlT9WA6grNakQXvg2gr5AbCuWhkAqF8lBIhUJ5f65w89SimwbjqyscsJyX7oIBlRUOX1PaTWyleFKNr63Q9Gyfzs6rAdUVDpdtulYwvrpCdiiUh0IqFMpDIRUK5f29ws2QLlxVpK6w5RkuLdLg8klb4WYbM3xukQQrSrUVmkmS0vnnakB1hZ2HlwnVdryuBlRXyA6F8lBIhUJ5KKRCoTwUUqkrHPXoi76w6uuHffe+p69QveqrzXABbH3wwYW6QvJzPo/CG/j0FXJDoTwUUqFQHgqpUCjv7xVOGVZ9hbfsqyucc5yX2nAZmbJCplVfeTW+tkIztp7ODqoB1RUOFzvyoq9d+EgldYXsUCgPhVQolIdCKhTKQyEVCuUxfIPHVcdnfTX7RLqpdUlPcPy7NLLrz39N0Mo6F94/z2x5fGhkw99Z9pg458c9GQ/9KPKzZgPNrS8u62PS165dFkcu3jf9iFYzTTKGdy4uSP3+tulAY0aHV89xy1qNbD9vfAuWVp0bGR0FT7sGAAAAAAAAAAAAAAAAAAAAAAAAAIBf5h8BJpOtPejX2gAAAABJRU5ErkJggg=="
                        alt="docs image"
                        width={40}
                        height={40}
                        className="text-black cursor-pointer relative"
                        title="API Documentation"
                    />
                </Link>
                <span className={`${_manageKeys ? "pb-[32px]" : ""}`}>
                    <div
                        className={`w-4 h-4 border-2 rounded-full relative flex justify-center items-center ${
                            isLoading
                                ? "bg-[#e7fc2b] border-[#e7fc2b]"
                                : keys?.some((key) => key.status === "active")
                                ? "bg-green-400 border-green-400"
                                : "bg-[#f42a2a] border-[#e37070]"
                        } animate-pulse`}
                        title="Active Key Status"
                    ></div>
                </span>
            </div>
        </>
    );
};

export default StatusIndicator;
