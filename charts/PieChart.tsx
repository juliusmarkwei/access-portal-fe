import {
    Chart,
    Colors,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const AdminPieChart = () => {
    const accessToken = Cookies.get("access-token");
    const [schoolKeyStatus, setSchoolKeyStatus] = useState([]);
    const chartRef = useRef(null); // Ref to hold the Chart instance

    useEffect(() => {
        fetchSchoolAccessKeyData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing Chart instance
        }
        initializeChart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolKeyStatus]);

    const initializeChart = () => {
        const keyStatusCounts = {
            inactive: 0,
            active: 0,
            revoked: 0,
            expired: 0,
        };
        schoolKeyStatus.forEach((key) => {
            keyStatusCounts[key.status] += 1;
        });

        const data = {
            labels: ["Inactive", "Active", "Revoked", "Expired"],
            datasets: [
                {
                    label: "Count",
                    data: [
                        keyStatusCounts.inactive,
                        keyStatusCounts.active,
                        keyStatusCounts.revoked,
                        keyStatusCounts.expired,
                    ],
                    backgroundColor: [
                        "#c5d629",
                        "#21de32",
                        "#dd2289",
                        "#fb0409",
                    ],
                    hoverOffset: 4,
                },
            ],
        };

        const config: any = {
            type: "doughnut",
            data: data,
            options: {
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        };

        Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
        const ctx = document.getElementById(
            "myChart"
        ) as HTMLCanvasElement | null;
        if (ctx) {
            chartRef.current = new Chart(ctx, config); // Store the new Chart instance
        }
    };

    const fetchSchoolAccessKeyData = async () => {
        try {
            const response = await fetch(`${baseURL}/admin/access-key/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${accessToken}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSchoolKeyStatus(data.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center mt-10 h-[75%] w-[82%]">
            <h1 className="font-bold text-2xl mb-4 px-8 text-[#393b3f]">
                Key Status Proportion
            </h1>
            <canvas id="myChart"></canvas>
        </div>
    );
};

export default AdminPieChart;
