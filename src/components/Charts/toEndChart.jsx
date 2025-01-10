import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { toast } from 'react-toastify';
import './toEndChart.css'

const TaskChart = () => {
    const [chartData, setChartData] = useState(null);
    const [view, setView] = useState("month"); // Default view is "month"

    const apiUrls = {
        day: 'https://taskmanager-yxx2.onrender.com/api/task/task-counts-by-day-to-end',
        month: 'https://taskmanager-yxx2.onrender.com/api/task/task-counts-by-month-to-end',
        year: 'https://taskmanager-yxx2.onrender.com/api/task/task-counts-by-year-to-end',
    };

    useEffect(() => {
        fetchData(view); // Fetch default view data on mount
    }, [view]);

    const fetchData = async (viewType) => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.get(apiUrls[viewType], {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }

            processChartData(response.data, viewType);

        } catch (error) {
            console.error(`Error fetching ${viewType}-wise data`, error);
            toast.error(`Not able to fetch ${viewType}-wise data`);
        }
    };

    const processChartData = (data, viewType) => {
        const labels = Object.keys(data); // Dates, months, or years based on view
        const values = Object.values(data); // Task counts

        const labelName =
            viewType === "day"
                ? "Tasks by Day"
                : viewType === "month"
                ? "Tasks by Month"
                : "Tasks by Year";

        setChartData({
            labels,
            datasets: [
                {
                    label: labelName,
                    data: values,
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        });
    };

    return (
        <div className="taskChart-toEnd" >
            <div className='toEnd-header' >
                <h2>Task Last Date</h2>
                <select
                    className='toEnd-select'
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                    
                >
                    <option value="day">Day-wise</option>
                    <option value="month">Month-wise</option>
                    <option value="year">Year-wise</option>
                </select>
            </div>
            {chartData ? (
                <Bar 
                    style={{padding: "1rem"}}
                    data={chartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                position: "top",
                            },
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default TaskChart;
