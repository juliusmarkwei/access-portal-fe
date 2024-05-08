// context.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

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
    checkAccessTokenExpiry: () => void;
    checkRefreshTokenExpiry: () => void;
    refreshAccessToken: () => void;
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
    const accessTokenExpiry = Cookies.get("access_token_expiry");
    const refreshTokenExpiry = Cookies.get("refresh_token_expiry");
    const refreshToken = Cookies.get("refresh_token");

    useEffect(() => {
        // run every 5 minutes
        const interval = setInterval(() => {
            checkAccessTokenExpiry();
            checkRefreshTokenExpiry();
            refreshAccessToken();
        }, 300000);
        return () => clearInterval(interval);
    });

    const checkAccessTokenExpiry = () => {
        if (accessTokenExpiry) {
            const expiry = new Date(accessTokenExpiry);
            const now = new Date();
            if (expiry < now) {
                Cookies.remove("access_token");
                Cookies.remove("access_token_expiry");
                Cookies.remove("refresh_token");
                Cookies.remove("refresh_token_expiry");
            }
        }
    };

    const checkRefreshTokenExpiry = () => {
        if (refreshTokenExpiry) {
            const expiry = new Date(refreshTokenExpiry);
            const now = new Date();
            if (expiry < now) {
                Cookies.remove("access_token");
                Cookies.remove("access_token_expiry");
                Cookies.remove("refresh_token");
                Cookies.remove("refresh_token_expiry");
            }
        }
    };

    const refreshAccessToken = async () => {
        if (refreshToken) {
            const response = await fetch(`${baseURL}/auth/refresh/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
            if (response.ok) {
                const data = await response.json();
                Cookies.set("access_token", data.access);
                Cookies.set("refresh_token", data.refresh);
                Cookies.set(
                    "access_token_expiry",
                    (new Date().getTime() + 3600000 * 24).toString(),
                    { expires: new Date(Date.now() + 3600000 * 24) }
                );
            }
        }
    };

    return (
        <AppContext.Provider
            value={{
                keys,
                setKeys,
                filteredKeys,
                setFilteredKeys,
                checkAccessTokenExpiry,
                checkRefreshTokenExpiry,
                refreshAccessToken,
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
