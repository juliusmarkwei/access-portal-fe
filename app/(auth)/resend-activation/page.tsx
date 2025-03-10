"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const ResendActivation = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const router = useRouter();

	const handleOnChange = (e: { target: { value: any } }) => {
		const value = e.target.value;
		setEmail((prev) => (prev = value));
	};

	const resendActivation = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch(
				`${baseURL}/auth/user/resend_activation/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email }),
				}
			);
			if (response.ok) {
				toast.success("Check your mail to activate account", {
					duration: 4000,
				});
				setIsLoading(false);
				router.push("/login");
			} else {
				toast.error("Given email does not exist, try again!", {
					duration: 4000,
				});
				setIsLoading(false);
			}
		} catch (error) {
			toast.error("Something went wrong, try again!", {
				duration: 4000,
			});
			setIsLoading(false);
		}
	};
	const disableBtn = () => {
		return email === "";
	};
	return (
		<>
			<main className="flex flex-col justify-center items-center min-h-screen">
				<h1 className="text-[#121b33] text-[2rem] lg:text-[3rem] my-10">
					Resend activation link
				</h1>
				<p className="text-black m-8">
					The link will be active for 1 day
				</p>
				<form
					onSubmit={(e) => resendActivation(e)}
					className="flex flex-col items-center w-[100%]"
				>
					<label
						htmlFor="email"
						className="absolute overflow-hidden w-0 h-[-1px]"
					>
						Email
					</label>
					<input
						required
						onChange={handleOnChange}
						type="email"
						placeholder="Email"
						value={email}
						className="h-14 w-[70%] lg:w-[45%] border-2 border-[#06b96f] rounded-md p-[10px] focus:outline-none focus:ring-2 focus:ring-[#06b96f] focus:border-transparent"
					/>
					<button
						disabled={isLoading || disableBtn()}
						type="submit"
						className={`p-5 mt-5 w-32 text-white bg-[#06b96f] rounded-md hover:bg-[#2d7d5c] ${
							isLoading || disableBtn()
								? "cursor-not-allowed"
								: ""
						}}`}
					>
						Resend
					</button>
				</form>
			</main>
		</>
	);
};

export default ResendActivation;
