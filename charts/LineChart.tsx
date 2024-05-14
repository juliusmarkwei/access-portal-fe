import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
    const chartContainer = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext("2d");
            if (ctx) {
                new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: data.labels,
                        datasets: data.datasets,
                    },
                    options: {
                        scales: {
                            x: {
                                type: "time", // Assuming the time-based distribution of key statuses
                                time: {
                                    unit: "month", // Adjust the time unit based on your data granularity
                                    displayFormats: {
                                        month: "MMM YYYY", // Format for month and year display
                                    },
                                },
                                title: {
                                    display: true,
                                    text: "Time", // X-axis label
                                },
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Count", // Y-axis label
                                },
                            },
                        },
                    },
                });
            }
        }
    }, [data]);

    return <canvas ref={chartContainer} />;
};

export default LineChart;
