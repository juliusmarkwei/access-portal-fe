import React from "react";

const DashboaardLastKeyCreationDate = ({ keysInfo }) => {
    const getLastAccessKeyCreationDate = () => {
        const sortedKeys = keysInfo.sort((a: any, b: any) => {
            const dateA = new Date(a.created_at).getTime(); // Convert to timestamp
            const dateB = new Date(b.created_at).getTime(); // Convert to timestamp
            return dateB - dateA; // Compare timestamps
        });

        const lastAccessKeyCreationDate =
            sortedKeys.length > 0 ? sortedKeys[0].created_at : null;
        return lastAccessKeyCreationDate;
    };

    const lastAccessKeyCreationDate = getLastAccessKeyCreationDate();

    return (
        <>
            <div className="stat">
                <div className="stat-figure text-orange-300 hover:text-orange-400 transition-colors duration-500 ease-in-out py-14">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-8 h-8 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title">Previous key created at</div>
                <div className="font-bold text-[2rem] h-[100px] flex items-center">
                    {lastAccessKeyCreationDate === null
                        ? "Not available"
                        : lastAccessKeyCreationDate.toString()}
                </div>
            </div>
        </>
    );
};

export default DashboaardLastKeyCreationDate;
