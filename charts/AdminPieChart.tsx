import { color } from "chart.js/helpers";
import {
    Chart,
    Colors,
    DoughnutController,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

const AdminPieChart = () => {
    const accessToken = Cookies.get("access-token");
    const [schoolKeyStatus, setSchoolKeyStatus] = useState([]);

    useEffect(() => {
        fetchSchoolAccessKeyData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        } catch (error) {}
    };

    const keyStatusCounts = { inactive: 0, active: 0, revoked: 0, expired: 0 };
    schoolKeyStatus.forEach((key) => {
        keyStatusCounts[key.status] += 1;
    });

    const data = {
        labels: ["Inactive", "Active", "Revoked", "Expired"],
        datasets: [
            {
                label: "My First Dataset",
                data: [
                    keyStatusCounts.inactive,
                    keyStatusCounts.active,
                    keyStatusCounts.revoked,
                    keyStatusCounts.expired,
                ],
                color: ["#c5d629", "#21de32", "#dd2289", "#fb0409"],
                hoverOffset: 4,
            },
        ],
    };

    Chart.register(DoughnutController, ArcElement, Colors, Tooltip, Legend);
    const config: any = {
        type: "doughnut",
        data: data,
    };

    if (typeof window !== "undefined") {
        var ctx = document.getElementById("myChart") as HTMLCanvasElement;
        if (ctx) {
            // Check if a chart already exists on the canvas
            if (Chart.getChart(ctx)) {
                // Destroy the existing chart
                Chart.getChart(ctx)?.destroy();
            }
        }

        new Chart(ctx, config);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl mb-4 px-8 text-[#393b3f]">
                Key Status Proportion
            </h1>
            <canvas id="myChart"></canvas>
        </div>
    );
};

export default AdminPieChart;
