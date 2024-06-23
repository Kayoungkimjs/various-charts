import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  ChartOptions,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js'
import { Layouts } from '../components/Layout/Layouts'
import { highlightGridPlugin } from '../utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const countries = ['CN', 'KR', 'JP']
      try {
        const dataPromises = countries.map(async (country) => {
          const response = await axios.get(
            `https://api.worldbank.org/v2/countries/${country}/indicators/SP.DYN.CBRT.IN?MRV=30&format=json`
          )

          const data = response.data[1].reverse()
          return { data, country }
        })

        const results = await Promise.all(dataPromises)

        const datasets = results.map((result, index) => {
          return {
            label: result.data[0].country.value,
            data: result.data.map((rate: { value: number }) => rate.value),
            borderWidth: 3,
            borderColor:
              index === 2
                ? 'rgba(255, 0, 0, 1)'
                : index === 1
                ? 'rgba(31, 119, 180, 1)'
                : 'rgba(250, 218, 94, 1)',
            tension: 0.3,
            backgroundColor: '#ffff',
            hoverBackgroundColor:
              index === 2
                ? 'rgba(255, 0, 0, 1)'
                : index === 1
                ? 'rgba(31, 119, 180, 1)'
                : 'rgba(250, 218, 94, 1)',
          }
        })

        setChartData({
          labels: results[0].data.map((entry: { date: number }) => entry.date),
          datasets: datasets,
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        boxPadding: 5,
        titleSpacing: 5,
        usePointStyle: true,
      },
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          color: '#000',
          usePointStyle: true,
          pointStyle: 'line',
          pointStyleWidth: 30,
        },
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Year',
          color: '#333',
          font: {
            size: 15,
            weight: 'bold',
          },
          padding: { top: 10 },
        },
        ticks: {
          color: '#000',
          maxTicksLimit: 15,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Birth Rate (per 1,000 people)',
          color: '#333',
          font: {
            size: 15,
            weight: 'bold',
            family: 'Arial',
          },
          padding: { bottom: 10 },
        },
        ticks: {
          color: '#000',
        },
      },
    },
  }

  return (
    <Layouts
      title={'Birth Rates of East Asia(CJK)'}
      description={
        'Birth rates in Korea, China and Japan from 1993 to 2022 (30 years)'
      }
      url={'https://data.worldbank.org/indicator/SP.DYN.CBRT.IN'}
      dataSource={'World Bank Group'}
    >
      <div>
        <Line
          data={chartData}
          options={options}
          plugins={[highlightGridPlugin]}
        />
      </div>
    </Layouts>
  )
}
