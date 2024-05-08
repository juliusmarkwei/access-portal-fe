import React from "react";

interface InputUIProps {
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: {
        key_tag: string;
    };
    inputType: string;
    svg: React.ReactNode;
}

const InputUI = ({
    handleOnChange,
    formData,
    inputType,
    svg,
}: InputUIProps) => {
    return (
        <>
            <label className="flex items-center gap-2 mx-auto border-[1px] border-[#121b33] h-14 rounded-lg px-4 mt-4">
                {svg}

                <input
                    type={inputType}
                    className="grow border-none bg-transparent focus:outline-none"
                    placeholder="Key tag"
                    name="key_tag"
                    value={formData.key_tag}
                    onChange={handleOnChange}
                />
            </label>
        </>
    );
};

export default InputUI;
