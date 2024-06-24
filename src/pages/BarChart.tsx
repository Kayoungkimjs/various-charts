import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import data from '../data/population.json'
import { Layouts } from '../components/Layout/Layouts'
import { Select } from '../components/Select'
import { BARCHARTOPTION } from '../constants/selectOption'
import { useSelect } from '../hooks/useSelect'
import {
  Chart as ChartJS,
  CategoryScale,
  ChartOptions,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const BarChart: React.FC = () => {
  const [sortBy, setSortBy] = useSelect('highest')
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sortedData =
          sortBy === 'highest'
            ? data.sort((a, b) => b.value - a.value)
            : data.sort((a, b) => a.value - b.value)

        const labels = sortedData.map(
          (item: { country: string }) => item.country
        )
        const values = sortedData.map((item: { value: number }) => item.value)

        setChartData({
          labels,
          datasets: [
            {
              label: 'Millions of People',
              data: values,
              backgroundColor: 'rgba(153, 102, 255)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1,
              barPercentage: 1,
            },
          ],
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [sortBy])

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    plugins: {
      legend: {
        labels: {
          color: '#000',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          color: '#000',
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <Layouts
      title={'Top 20 Countries by Population in 2023'}
      description={'The Most Populated Countries in the World in 2023'}
      url={
        'https://www.worldometers.info/world-population/population-by-country/'
      }
      dataSource={'Worldometer'}
    >
      <Select onChange={setSortBy} value={sortBy} options={BARCHARTOPTION} />
      <div>
        <Bar data={chartData} options={options} />
      </div>
    </Layouts>
  )
}
