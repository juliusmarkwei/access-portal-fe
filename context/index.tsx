// context.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Keystype {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
}

interface AppContextType {
    keys: Keystype[] | undefined;
    setKeys: React.Dispatch<React.SetStateAction<Keystype[] | undefined>>;
    filteredKeys: Keystype[] | undefined;
    setFilteredKeys: React.Dispatch<
        React.SetStateAction<Keystype[] | undefined>
    >;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [keys, setKeys] = useState<Keystype[] | undefined>(undefined);
    const [filteredKeys, setFilteredKeys] = useState<Keystype[] | undefined>(
        undefined
    );
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            handleRefreshAccessToken();
        }, 3500000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRefreshAccessToken = async () => {
        const refreshToken = Cookies.get("refresh-token");
        console.log("Refresh token: ", refreshToken);
        if (refreshToken) {
            console.log("Requesting for new access token");
            const response = await fetch(`${baseURL}/auth/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
            if (response.ok) {
                const data = await response.json();

                const access_expires = new Date();
                access_expires.setTime(access_expires.getTime() + 3600000);
                Cookies.set("access-token", data.access, {
                    expires: access_expires,
                });
            }
        } else {
            console.log("No refresh token found.");
            Cookies.remove("access-token");
            Cookies.remove("refresh-token");
            Cookies.remove("_se7_wer_");
            toast.error("Session expired. Please login again.");
            router.push("/login");
        }
    };

    return (
        <AppContext.Provider
            value={{
                keys,
                setKeys,
                filteredKeys,
                setFilteredKeys,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppWrapper");
    }
    return context;
};
