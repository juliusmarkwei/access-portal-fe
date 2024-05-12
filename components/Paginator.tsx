import React, { FC } from "react";

interface PaginatorProps {
    disableNext: boolean;
    disablePrevious: boolean;
    handleNextPage: () => void;
    handlePreviousPage: () => void;
}

const Paginator: FC<PaginatorProps> = ({
    disableNext,
    disablePrevious,
    handleNextPage,
    handlePreviousPage,
}) => {
    return (
        <>
            <div className="join grid grid-cols-2 justify-center items-center px-[30%]">
                <button
                    className={`join-item btn btn-outline bg-[#393a3e] text-white hover:bg-[#121b33] transition-colors duration-500 ${
                        disablePrevious && "cursor-not-allowed"
                    }`}
                    // disabled={disablePrevious}
                    title={`${
                        disablePrevious ? "No previous page" : "Previous page"
                    }`}
                    onClick={handlePreviousPage}
                >
                    Previous page
                </button>
                <button
                    className={`join-item btn btn-outline bg-[#393a3e] text-white hover:bg-[#121b33] transition-colors duration-500 ${
                        disableNext && "cursor-not-allowed"
                    }`}
                    // disabled={disableNext}
                    title={`${disableNext ? "No more pages" : "Next page"}`}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Paginator;
