/* eslint-disable react-hooks/exhaustive-deps */
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
import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const AdminPieChart = () => {
    const accessToken = Cookies.get("access-token");
    const [schoolKeyStatus, setSchoolKeyStatus] = useState([]);
    const chartRef = useRef(null); // Ref to hold the Chart instance

    useEffect(() => {
        fetchSchoolAccessKeyData();
    }, []);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing Chart instance
        }
        initializeChart();
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
                        "#8EAC53",
                        "#53AC9E",
                        "#7153AC",
                        "#AC5361",
                    ],
                    hoverOffset: 5,
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
            toast.error("Failed to fetch data", { duration: 4000 });
        }
    };

    return <canvas id="myChart" className="h-[120%]"></canvas>;
};

export default AdminPieChart;
