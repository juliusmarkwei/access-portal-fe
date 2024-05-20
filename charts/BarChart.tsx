/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js/auto";
import NoDataIllustration from "@/public/9264885.jpg";
import Image from "next/image";

Chart.register(...registerables);

interface KeysInfoType {
    key: string;
    key_tag: string;
    status: string;
    procurement_date: string;
    expiry_date: string;
    created_at: string;
}

const BarChart = ({ keysInfo }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (keysInfo.length > 0) {
            createChart();
        }
    }, [keysInfo]);

    const keyStatusLabelsSet = new Set(
        keysInfo.map((key: KeysInfoType) => key.status)
    );

    const keyStatusCounts = Array.from(keyStatusLabelsSet).reduce(
        (acc: { [key: string]: number }, key: number) => {
            const count = keysInfo.filter(
                (keyInfo: any) => keyInfo.status === key
            ).length;
            acc[key] = count;
            return acc;
        },
        {}
    );

    const createChart = () => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const chartElement = document.getElementById(
            "barChart"
        ) as HTMLCanvasElement;
        if (chartElement) {
            const newChart = new Chart(chartElement, {
                type: "bar",
                data: {
                    labels: Array.from(keyStatusLabelsSet),
                    datasets: [
                        {
                            label: "Key Statuses Count",
                            data: Object.values(keyStatusCounts),
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(20, 205, 16, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgba(20, 205, 16, 40)",
                                "rgb(75, 192, 192)",
                            ],
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            type: "linear",
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                font: {
                                    size: 15,
                                    weight: "bold",
                                },
                            },
                        },
                        x: {
                            type: "category",
                            ticks: {
                                font: {
                                    size: 15,
                                    weight: "bold",
                                },
                            },
                        },
                    },
                },
            });
            chartRef.current = newChart;
        }
    };

    return (
        <>
            {keysInfo.length > 0 ? (
                <div className="h-[90%] w-[100%] px-8">
                    <canvas id="barChart" className=""></canvas>
                </div>
            ) : (
                <Image
                    src={NoDataIllustration}
                    alt="no data"
                    height={300}
                    width={300}
                    className="h-[60%] w-[60%]"
                    priority
                />
            )}
        </>
    );
};

export default BarChart;
