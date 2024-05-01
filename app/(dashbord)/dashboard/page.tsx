import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DashbaordProps {}

const Dashbaord = () => {
    return (
        <div className="container py-12">
            <h1 className="font-bold text-3xl mb-8 px-8 text-[#393b3f]">
                {" "}
                Welcome to Access Portal{" "}
                <hr className="mt-3 border-b-2 border-[#2f2f37]" />
            </h1>
        </div>
    );
};

export default Dashbaord;
