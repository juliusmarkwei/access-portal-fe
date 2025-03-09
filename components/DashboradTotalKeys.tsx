/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

interface DashboradTotalKeysPropType {
	getKeysInfo: () => void;
	keysInfo: any;
}

const DashboradTotalKeys = ({
	getKeysInfo,
	keysInfo,
}: DashboradTotalKeysPropType) => {
	const [_isLoading, _setIsLoading] = useState(false);

	useEffect(() => {
		getKeysInfo();
	}, []);

	const percentageDifferenceLastYear = () => {
		let thisYear = new Date().getFullYear();
		let lastYear = thisYear - 1;

		// Filter keys generated in last year and this year
		let keysGeneratedThisYear = keysInfo.filter((key: any) => {
			let keyYear = new Date(key.created_at).getFullYear();
			return keyYear === thisYear;
		});

		let keysGeneratedLastYear = keysInfo.filter((key: any) => {
			let keyYear = new Date(key.created_at).getFullYear();
			return keyYear === lastYear;
		});

		// Calculate the percentage of keys generated this year and last year
		let percentageThisYear =
			(keysGeneratedThisYear.length / keysInfo.length) * 100;
		let percentageLastYear =
			(keysGeneratedLastYear.length / keysInfo.length) * 100;

		// Calculate the percentage difference
		let percentageDifference = percentageThisYear - percentageLastYear;

		return percentageDifference;
	};

	const calculateTotalKeys = keysInfo.length;

	return (
		<>
			<div className="stat">
				<div className="stat-figure text-secondary">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="inline-block w-8 h-8 stroke-current text-green-500 hover:text-green-700 transition-colors duration-500 ease-in-out"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						></path>
					</svg>
				</div>
				<div className="stat-title">Total key generated</div>
				<div className="stat-value text-secondary">
					{calculateTotalKeys > 0 ? calculateTotalKeys : "Zero"}
					{`${calculateTotalKeys > 1 ? " keys" : " key"}`}
				</div>
				<div className="stat-desc">
					{`${
						percentageDifferenceLastYear() > 0
							? percentageDifferenceLastYear()
							: 0
					}% more than last year`}
				</div>
			</div>
		</>
	);
};

export default DashboradTotalKeys;
