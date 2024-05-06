import React, { FC, useEffect } from "react";

interface ModalProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isModalOpen: boolean;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children, setIsModalOpen, isModalOpen }) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const modal = document.getElementById("modal-container");

            if (modal && !modal.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setIsModalOpen, isModalOpen]);

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-white bg-opacity-80">
            <div
                id="model-container"
                className="w-[350px] rounded-[16px] bg-white p-[20px]"
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
