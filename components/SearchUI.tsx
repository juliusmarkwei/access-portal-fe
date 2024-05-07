import { useAppContext } from "@/context";
import { useState, useEffect } from "react";

const SearchUI = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { keys, setKeys } = useAppContext();

    const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSearchQuery = e.target.value;
        setSearchQuery(updatedSearchQuery);
        const filteredKeys = keys?.filter((key) =>
            key.key_tag.toLowerCase().includes(updatedSearchQuery.toLowerCase())
        );
        setKeys(filteredKeys || []);
    };
    console.log(keys);

    return (
        <>
            <label className="input input-bordered items-center gap-2 flex w-[40%]">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search by key tag..."
                    onChange={handleSearchQuery}
                    value={searchQuery}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>
        </>
    );
};

export default SearchUI;
