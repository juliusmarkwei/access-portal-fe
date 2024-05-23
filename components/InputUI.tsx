import React from "react";

interface InputUIProps {
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formDataProperty: string;
    inputType: string;
    inputName: string;
    svg: React.ReactNode;
}

const InputUI = ({
    handleOnChange,
    formDataProperty,
    inputType,
    inputName,
    svg,
}: InputUIProps) => {
    return (
        <>
            <label className="flex items-center gap-2 mx-auto border-[1.5px] border-[#121b33] h-14 rounded-lg px-4 mt-4">
                {svg}

                <input
                    type={inputType}
                    className="grow border-none bg-transparent focus:outline-none"
                    placeholder={inputName}
                    name={inputName}
                    value={formDataProperty}
                    onChange={handleOnChange}
                    required
                />
            </label>
        </>
    );
};

export default InputUI;
