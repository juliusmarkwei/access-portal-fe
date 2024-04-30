import Image from "next/image";
import Cookies from "js-cookie";

interface LogoutProps {
    handleLogout: any;
}

const Logout = ({ handleLogout }: LogoutProps) => {
    let full_name = Cookies.get("hg63_#6y0") as string;
    let email = Cookies.get("bty3_35=") as string;
    full_name = JSON.parse(full_name);
    email = JSON.parse(email);

    return (
        <li className="-mx-6 mt-auto flex items-center">
            <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 ">
                    <Image
                        fill
                        referrerPolicy="no-referrer"
                        className="rounded-full"
                        src="https://imgs.search.brave.com/AsI6A-l4zfAgyTpKazw0KEe1yTEfs0I1USKOfWVg-Ew/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzE2MzMy/NS9zY3JlZW5zaG90/cy82Mzg1NTUwL3Rv/cF9waWN0dXJlXzF4/LnBuZz9yZXNpemU9/NDAweDA"
                        alt="Your profile picture"
                    />
                </div>

                <span className="sr-only">Your profile</span>

                <div className="flex flex-col">
                    <span arial-hidden="true">{full_name}</span>
                    <span
                        className="text-sx text-zinc-400 w-32 overflow-ellipsis truncate"
                        arial-hidden="true"
                    >
                        {email}
                    </span>
                </div>
            </div>
            <button onClick={handleLogout}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:cursor-pointer mr-3"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                </svg>
            </button>
        </li>
    );
};

export default Logout;
