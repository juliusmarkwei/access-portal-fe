/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
import StatusIndicator from "@/components/StatusIndicator";
import SearchUI from "@/components/KeySearchUI";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import Paginator from "@/components/Paginator";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface ResponseOptionsType {
	next: string;
	previous: string;
}

const ManageKeys = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [switchCopiedImage, setSwitchCopiedImage] = useState(false);
	const [selectedKeyTag, setSelectedKeyTag] = useState("");
	const [responseOptions, setResponseOptions] =
		useState<ResponseOptionsType>();
	const accessToken = Cookies.get("access-token");
	const { keys, setKeys } = useAppContext();
	const { filteredKeys } = useAppContext();
	const route = useRouter();
	const [disableNext, setDisableNext] = useState(false);
	const [disablePrevious, setDisablePrevious] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleImageClick = (keyTag: string) => {
		setSelectedKeyTag(keyTag);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			// Check if selectedKeyTag is truthy and the target is not inside a td element
			const sanitizedTag = selectedKeyTag.replace(/[\s']/g, ""); // Remove whitespace
			if (
				selectedKeyTag &&
				!(
					e.target instanceof HTMLElement &&
					e.target.closest(sanitizedTag) &&
					e.target.closest("td")
				)
			) {
				setSelectedKeyTag(""); // Clear selected key tag
			}
			const dropdown = dropdownRef.current;
			if (
				dropdown &&
				!dropdown.contains(e.target as Node) &&
				e.target instanceof HTMLElement &&
				!e.target.closest(".status")
			) {
				setSelectedKeyTag("");
				setShowDropdown(false); // Close the dropdown
			}
		};

		document.addEventListener("click", handleClickOutside);

		// Cleanup function to remove event listener when component unmounts
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [selectedKeyTag]);

	useEffect(() => {
		loadKeys();
	}, []);

	const loadKeys = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${baseURL}/access-key/`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${accessToken}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setKeys(data.results);
				setResponseOptions({
					next: data.next,
					previous: data.previous,
				});
				if (data.next === null) {
					setDisableNext(true);
				}
				if (data.previous === null) {
					setDisablePrevious(true);
				}
			} else {
				const data = await response.json();
				toast.error(data.error, { duration: 4000 });
			}
		} catch (error) {
			toast.error("An error occurred", { duration: 4000 });
		}
		setIsLoading(false);
		setShowDropdown(false);
	};

	const handelCopied = (textTOCopy: string) => {
		navigator.clipboard.writeText(textTOCopy);
		toast.success("Key copied", { duration: 4000 });
		setSwitchCopiedImage(true); // Immediately set to true
		setTimeout(() => {
			setSwitchCopiedImage(false); // Set back to false after 2 seconds
		}, 2000);
	};

	const handleDeleteInactiveAccessKey = async (keyTag: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(`${baseURL}/access-key/${keyTag}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${accessToken}`,
				},
			});
			if (response.ok) {
				setSelectedKeyTag(""); // Clear selected key tag
				await loadKeys();
				route.refresh();
				toast.success("Key deleted successfully", { duration: 4000 });
			} else {
				const data = await response.json();
				toast.error(data.error, { duration: 4000 });
			}
		} catch (error) {
			toast.error("An error occurred", { duration: 4000 });
		}
		setIsLoading(false);
	};

	const handlePreviousPage = async () => {
		if (!responseOptions?.previous) return;
		setIsLoading(true);
		try {
			const response = await fetch(responseOptions?.previous, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${accessToken}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setKeys(data.results);
				setResponseOptions({
					next: data.next,
					previous: data.previous,
				});
				if (data.next === null) {
					setDisableNext(true);
				} else {
					setDisableNext(false);
				}
				if (data.previous === null) {
					setDisablePrevious(true);
				} else {
					setDisablePrevious(false);
				}
			}
		} catch (error) {}
		setIsLoading(false);
	};

	const handleNextPage = async () => {
		if (!responseOptions?.next) return;
		setIsLoading(true);
		try {
			const response = await fetch(responseOptions?.next, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `JWT ${accessToken}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setKeys(data.results);
				setResponseOptions({
					next: data.next,
					previous: data.previous,
				});
				if (data.next === null) {
					setDisableNext(true);
				} else {
					setDisableNext(false);
				}
				if (data.previous === null) {
					setDisablePrevious(true);
				} else {
					setDisablePrevious(false);
				}
			}
		} catch (error) {}
		setIsLoading(false);
	};

	const handleShowDropdown = () => {
		setShowDropdown(true);
	};

	const handleSelectAllByStatus = async (status: string) => {
		setIsLoading(true);
		setShowDropdown(false);
		try {
			const response = await fetch(
				`${baseURL}/access-key/?status=${status}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `JWT ${accessToken}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.json();
				setKeys(data.results);
				setResponseOptions({
					next: data.next,
					previous: data.previous,
				});
				if (data.next === null) {
					setDisableNext(true);
				}
				if (data.previous === null) {
					setDisablePrevious(true);
				}
			}
			if (response.status === 404) {
				setKeys([]);
			}
		} catch (error) {
			toast.error("Failed to fetch data", { duration: 4000 });
		}
		setIsLoading(false);
	};

	return (
		<>
			<StatusIndicator
				isLoading={isLoading}
				SearchUI={SearchUI}
				setIsLoading={setIsLoading}
			/>

			<div className="container pt-12 px-8 flex flex-col h-[90dvh] ">
				<h1 className="flex flex-row font-bold text-3xl text-[#393b3f]">
					Manage Keys
				</h1>
				<hr className="mt-3 border-b-2 border-[#2f2f37]" />

				<>
					<main className="h-[70dvh]">
						<div className="overflow-x-auto h-[60dvh]">
							<table className="table ">
								{/* head */}
								<thead>
									<tr className="sticky top-0 bg-[#121b33] text-white border-2 rounded-xl border-[#121b33]">
										<th></th>
										<th>Key Tag</th>
										<th>Key</th>
										<th
											id="status"
											title="Filter keys by status"
										>
											<span
												className="flex items-center gap-2 justify-center"
												ref={dropdownRef}
											>
												Status
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth="1.5"
													stroke="currentColor"
													className="w-3 h-3 cursor-pointer"
													onClick={handleShowDropdown}
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
													/>
												</svg>
												{showDropdown && (
													<div className="absolute top-8 right-[58%] bg-[#121b33] text-white rounded-lg w-[100px] z-50">
														<button
															className="block text-white py-2 hover:bg-[#000000] rounded-md w-full"
															onClick={() =>
																handleSelectAllByStatus(
																	"inactive"
																)
															}
														>
															Inactive
														</button>
														<button
															className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
															onClick={() =>
																handleSelectAllByStatus(
																	"active"
																)
															}
														>
															Active
														</button>
														<button
															className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
															onClick={() =>
																handleSelectAllByStatus(
																	"revoked"
																)
															}
														>
															Revoked
														</button>
														<button
															className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
															onClick={() =>
																handleSelectAllByStatus(
																	"expired"
																)
															}
														>
															Expired
														</button>
														<button
															className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
															onClick={loadKeys}
														>
															<span className="flex justify-center items-center gap-1">
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	fill="none"
																	viewBox="0 0 24 24"
																	strokeWidth="1.5"
																	stroke="currentColor"
																	className="w-6 h-6"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		d="M6 18 18 6M6 6l12 12"
																	/>
																</svg>
																Clear Filter
															</span>
														</button>
													</div>
												)}
											</span>
										</th>
										<th>Date of Procurement</th>
										<th>Valid Until</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{isLoading ? (
										<div className="flex justify-center items-center w-[1350%]">
											<span className="loading loading-ring loading-lg h-[45vh] px-[10%] bg-green-400"></span>
										</div>
									) : (
										filteredKeys &&
										filteredKeys.map(
											(key: any, index: number) => (
												<React.Fragment key={index}>
													<tr>
														<th>{index + 1}</th>
														<td>{key.key_tag}</td>
														<td>
															<span
																className={`${
																	key.status ===
																	"active"
																		? "cursor-copy"
																		: "cursor-not-allowed"
																} border-[1px] bg-gray-200 border-[#d7d1d1] rounded-lg px-2 py-1 relative inline-block group`}
															>
																{key.key
																	.length > 14
																	? key.key.slice(
																			0,
																			10
																	  ) + "..."
																	: key.key}
																{key.status ===
																"active" ? (
																	<span
																		className="group-hover:opacity-100 absolute right-0 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-500 bg-green-400 h-7 pt-1 rounded-md"
																		onClick={() =>
																			handelCopied(
																				key.key
																			)
																		}
																	>
																		{switchCopiedImage ? (
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				viewBox="0 0 24 24"
																				fill="currentColor"
																				className="w-6 h-5"
																			>
																				<path
																					fillRule="evenodd"
																					d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
																					clipRule="evenodd"
																				/>
																				<path
																					fillRule="evenodd"
																					d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
																					clipRule="evenodd"
																				/>
																			</svg>
																		) : (
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				viewBox="0 0 24 24"
																				fill="currentColor"
																				className="w-6 h-5"
																			>
																				<path
																					fillRule="evenodd"
																					d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
																					clipRule="evenodd"
																				/>
																				<path
																					fillRule="evenodd"
																					d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
																					clipRule="evenodd"
																				/>
																			</svg>
																		)}
																	</span>
																) : (
																	""
																)}
															</span>
														</td>
														<td>
															<span
																className={`${
																	key.status ===
																	"inactive"
																		? "bg-yellow-400"
																		: key.status ===
																		  "active"
																		? "bg-green-400 px-[28.5px]"
																		: "bg-red-400 px-[25.5px]"
																} rounded-lg px-5 py-2 text-white`}
															>
																{key.status}
															</span>{" "}
														</td>
														<td>
															{key.procurement_date
																? key.procurement_date
																: "N/A"}
														</td>
														<td>
															{key.expiry_date
																? key.expiry_date
																: "N/A"}
														</td>
														<td
															className="relative"
															id={key.key_tag}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																fill="currentColor"
																className="w-6 h-6 cursor-pointer relative"
																onClick={() =>
																	handleImageClick(
																		key.key_tag
																	)
																}
															>
																<path
																	fillRule="evenodd"
																	d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
																	clipRule="evenodd"
																/>
															</svg>
															{key.key_tag ===
																selectedKeyTag && (
																<div className="absolute top-9 right-9 bg-[#121b33] text-white rounded-lg w-[80%] z-50">
																	<button
																		className="block text-white py-2 px-3 hover:bg-[#000000] rounded-md w-full"
																		onClick={() =>
																			handleDeleteInactiveAccessKey(
																				key.key_tag
																			)
																		}
																	>
																		Delete
																	</button>
																</div>
															)}
														</td>
													</tr>
												</React.Fragment>
											)
										)
									)}
									{keys && keys?.length === 0 && (
										<tr>
											<td
												colSpan={7}
												className="text-center"
											>
												No keys available
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</main>
				</>

				<>
					<Paginator
						disableNext={disableNext}
						disablePrevious={disablePrevious}
						handleNextPage={handleNextPage}
						handlePreviousPage={handlePreviousPage}
					/>

					<Footer />
				</>
			</div>
		</>
	);
};

export default ManageKeys;
