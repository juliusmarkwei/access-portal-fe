// context.tsx
import React, { createContext, useState, useContext } from "react";

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

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [keys, setKeys] = useState<Keystype[] | undefined>(undefined);
    const [filteredKeys, setFilteredKeys] = useState<Keystype[] | undefined>(
        undefined
    );

    return (
        <AppContext.Provider
            value={{ keys, setKeys, filteredKeys, setFilteredKeys }}
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
