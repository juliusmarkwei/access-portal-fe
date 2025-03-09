"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useRouter } from "next/navigation";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const SignUp = () => {
	const [isLoading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		fullName: "",
		phone: "",
		password: "",
		re_password: "",
	});
	const route = useRouter();

	const handleOnChange = (e: { target: { name: any; value: any } }) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSignUp = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await fetch(`${baseURL}/auth/signup/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: formData.email,
					full_name: formData.fullName,
					phone: formData.phone,
					password: formData.password,
					re_password: formData.re_password,
				}),
			});
			if (response.ok) {
				const data = await response.json();
				toast.success(data.message, {
					duration: 5000,
				});
				route.push("/login");
				setLoading(false);
			} else {
				const data = await response.json();
				toast.error(data.email, { duration: 5000 });
				setLoading(false);
			}
		} catch (error) {
			toast.error("An error occured, try again!", { duration: 4000 });
			setLoading(false);
		}
	};

	const disableBtn = () => {
		return (
			formData.email === "" ||
			formData.password === "" ||
			formData.re_password === "" ||
			formData.fullName === "" ||
			formData.phone === ""
		);
	};

	return (
		<main className="signup-container">
			<div className="signInBox">
				<main>
					<h1 className="helloText">Welcome Back!</h1>
					<p>
						To keep connected with us please login with your
						personal info
					</p>

					<button
						onClick={() => route.push("/login")}
						disabled={isLoading}
						className={`signInButton-SignUpPage ml-[30%] m-auto ${
							isLoading ? "cursor-not-allowed" : ""
						}`}
					>
						SIGN IN
					</button>
				</main>
			</div>

			<div className="signUpBox">
				<h1 className="signUpHeader">Create Account</h1>
				<form
					className="signUpForm"
					onSubmit={() => alert("You created an account!")}
				>
					<input
						type="text"
						className="signUpEmailField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-border-[#06b96f]"
						placeholder="Email"
						required
						value={formData.email}
						onChange={handleOnChange}
						name="email"
					/>
					<input
						type="text"
						className="signUpFirstNameField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-[#06b96f]"
						placeholder="Full Name"
						required
						value={formData.fullName}
						onChange={handleOnChange}
						name="fullName"
					/>

					<input
						type="text"
						className="signUpPhoneField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-[#06b96f]"
						placeholder="Phone"
						required
						value={formData.phone}
						onChange={handleOnChange}
						name="phone"
					/>
					<input
						type="password"
						className="signUpPasswordField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-[#06b96f]"
						placeholder="Password"
						required
						value={formData.password}
						onChange={handleOnChange}
						name="password"
					/>
					<input
						type="password"
						className="signUpPasswordField focus:border-[#06b96f] focus:outline-none focus:ring-1 focus:ring-[#06b96f]"
						placeholder="Repeat password"
						required
						value={formData.re_password}
						onChange={handleOnChange}
						name="re_password"
					/>
					<button
						disabled={disableBtn() || isLoading}
						onClick={handleSignUp}
						type="submit"
						className={`signUpButton-SignUpPage ${
							disableBtn() || isLoading
								? "hover:cursor-not-allowed"
								: ""
						}`}
					>
						{isLoading ? (
							<TailSpin
								color="white"
								width={50}
								radius={5}
								height={40}
							/>
						) : (
							"SIGN UP"
						)}
					</button>
				</form>
			</div>
		</main>
	);
};

export default SignUp;
