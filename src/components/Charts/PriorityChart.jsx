import React, { useEffect, useState } from 'react'
import { PolarArea } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'
import axios from 'axios'
import { toast } from 'react-toastify'
import './PriorityChart.css'

const PriorityChart = () => {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        const fetchPriorityCounts = async () => {
            const token = localStorage.getItem('authToken')
            try {
                const response = await axios.get('https://taskmanager-yxx2.onrender.com/api/task/priority-counts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status !== 200) {
                    throw new Error('Failed to fetch data')
                }

                processChartData(response.data)

            } catch (error) {
                console.error('error in Priority Chart', error)
                toast.error('Not able to fetch data')
            }
        }



        const processChartData = (data) => {
            const labels = Object.keys(data);
            const values = Object.values(data)


            setChartData({
                labels,
                datasets: [
                    {
                        label: "Task Priority",
                        data: values,
                        backgroundColor: ["#FF0000", "#00FF00", "#FFFF00"],
                        borderColor: ["#FF4500", "#32CD32", "#FFD700"],
                        borderWidth: 1,
                    },
                ]
                
            })
        }


        

        fetchPriorityCounts();
    },[])



    return (
        <div className='priorityChart'>
            <h2>Task Priority Distribution</h2>
            {
                chartData ? (
                    <PolarArea data={chartData} />
                ) : (
                    <p>Loading chart data...</p>
                )
            }
        </div>
    )
}

export default PriorityChart