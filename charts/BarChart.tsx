import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

interface SchoolsType {
    full_name: string;
}

const BarChart = () => {
    const [schoolNames, setSchoolNames] = useState<SchoolsType[]>([]);
    const accessToken = Cookies.get("access-token");
    const schoolKeyStatusCounts = {};

    useEffect(() => {
        const fetchSchoolNames = async () => {
            try {
                const response = await fetch(`${baseURL}/admin/schools/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `JWT ${accessToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();

                    const names = data.results.map(
                        (school: { full_name: string }) => ({
                            full_name: school.full_name,
                        })
                    );
                    setSchoolNames(names);
                }
            } catch (error) {
                // console.error("Error fetching school names: ", error);
            }
        };

        fetchSchoolNames();
        console.log(schoolNames);

        // Example data
        const data = {
            labels: ["School A", "School B", "School C", "School D"],
            datasets: [
                {
                    label: "Active Keys",
                    data: [20, 30, 25, 35],
                    backgroundColor: "#06b96f",
                },
                {
                    label: "Inactive Keys",
                    data: [10, 15, 20, 25],
                    backgroundColor: "yellow",
                },
                // Add more datasets for other key statuses if needed
            ],
        };

        // Chart configuration
        const config: any = {
            type: "bar",
            data: data,
            options: {
                scales: {
                    x: { stacked: true }, // Stack bars horizontally
                    y: { stacked: true }, // Stack bars vertically
                },
            },
        };

        // Get the canvas element
        const ctx = document.getElementById(
            "barChart"
        ) as HTMLCanvasElement | null;

        // Create the chart
        if (ctx) {
            new Chart(ctx, config);
        }

        // Cleanup function to destroy the chart when component unmounts
        return () => {
            const chartInstance = Chart.getChart(ctx);
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on component mount

    return (
        <div className="flex flex-col justify-center items-center px-5 mt-5 h-[75%] w-[82%]">
            <h1 className="font-bold text-2xl mb-4 px-8 text-[#393b3f]">
                Distribution of Keys by Schools
            </h1>
            <canvas id="barChart" />;
        </div>
    );
};

export default BarChart;
