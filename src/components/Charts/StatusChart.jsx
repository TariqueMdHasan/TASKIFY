import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import axios from 'axios'
import { toast } from 'react-toastify';
import './StatusChart.css'

const StatusChart = () => {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const fetchStatusCounts = async () => {
            const token = localStorage.getItem('authToken')
            try {
                const response = await axios.get('https://taskmanager-yxx2.onrender.com/api/task/status-counts',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                if (response.status !== 200) {
                    throw new Error('Failed to fetch data');

                }
                
                processChartData(response.data)

            } catch (error) {
                console.error('error in fetching data', error)
                toast.error('Not able to fetch data')
            }
        }

        const processChartData = (data) => {
            const labels = Object.keys(data);
            const values = Object.values(data);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Task Stauts",
                        data: values,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#4BC0C0",
                            "#9966FF",
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#4BC0C0",
                            "#9966FF",
                        ]
                    }
                ]
            })
        }

        fetchStatusCounts();
    }, [])


    return (
        <div className='StatusChart'>
            <h2>Task staus Distribution</h2>
            {
                chartData ? (
                    <Pie data={chartData} />
                ) : (
                    <p>Loading chart data...</p>
                )
            }
        </div>
    )
}

export default StatusChart