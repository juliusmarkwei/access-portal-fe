import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DashbaordProps {}

const Dashbaord = () => {
    return (
        <div className="container py-12">
            <h1 className="font-bold text-3xl mb-8 px-8 text-[#8832cd]">
                {" "}
                Welcome to Access Portal{" "}
            </h1>
        </div>
    );
};

export default Dashbaord;
