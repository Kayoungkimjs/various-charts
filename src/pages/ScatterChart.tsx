import React, { useEffect, useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ChartOptions,
  Title,
  Tooltip,
  Legend,
  ScatterController,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartData,
  InteractionModeMap,
} from 'chart.js'
import { usePapaParse } from 'react-papaparse'
import { Layouts } from '../components/Layout/Layouts'

ChartJS.register(
  ScatterController,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
)
interface AthleteData {
  height: number
  weight: number
  sport: string
}

export const ScatterChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData<'scatter'>>({
    datasets: [],
  })
  const { readRemoteFile } = usePapaParse()

  useEffect(() => {
    const handleReadRemoteFile = () => {
      readRemoteFile(
        'https://gist.githubusercontent.com/Kayoungkimjs/19d64103218233226a2ec8cdfe2ae48c/raw/5f65afda655af1a9f1a4f724a18c40797d09595c/olympics-athletes-2012.csv',
        {
          complete: (results) => {
            const data = parseCsvData(results.data)
            const chartData = prepareChartData(data)
            setChartData(chartData)
          },
          download: true,
        }
      )
    }

    handleReadRemoteFile()
  }, [readRemoteFile])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parseCsvData = (csvData: any[]): AthleteData[] => {
    return csvData.slice(1).map((row) => ({
      height: parseFloat(row[2]),
      weight: parseFloat(row[3]),
      sport: row[7],
    }))
  }

  const prepareChartData = (data: AthleteData[]): ChartData<'scatter'> => {
    const labels = ['Basketball', 'Gymnastics', 'Volleyball', 'Football']
    const datasets = labels.map((label) => {
      const filteredData = data.filter(
        (athlete) => athlete.sport === label.toLowerCase()
      )
      return {
        label: label,
        data: filteredData.map((athlete) => ({
          x: athlete.height,
          y: athlete.weight,
        })),
        backgroundColor: getBackgroundColor(label),
        borderColor: getBorderColor(label),
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      }
    })

    return { datasets }
  }

  const scatterOptions: ChartOptions<'scatter'> = {
    plugins: {
      legend: {
        position: 'chartArea',
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    },

    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Height(M)',
        },
        min: 1.5,
        max: 2.3,
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Weight(KG)',
        },
        min: 30,
        max: 150,
      },
    },
    interaction: {
      mode: 'nearest' as keyof InteractionModeMap,
      axis: 'xy',
      intersect: true,
    },
    hover: {
      mode: 'dataset',
      intersect: true,
    },
  }

  const getBackgroundColor = (label: string): string => {
    switch (label) {
      case 'Basketball':
        return 'rgba(255, 99, 132, 0.6)'
      case 'Gymnastics':
        return 'rgba(75, 192, 192, 0.6)'
      case 'Volleyball':
        return 'rgba(255, 206, 86, 0.6)'
      case 'Football':
        return 'rgba(153, 102, 255, 0.6)'
      default:
        return 'rgba(75, 192, 192, 0.6)'
    }
  }

  const getBorderColor = (label: string): string => {
    switch (label) {
      case 'Basketball':
        return 'rgba(255, 99, 132, 1)'
      case 'Gymnastics':
        return 'rgba(54, 162, 235, 1)'
      case 'Volleyball':
        return 'rgba(255, 206, 86, 1)'
      case 'Football':
        return 'rgb(153, 102, 255, 1)'
      default:
        return 'rgba(75, 192, 192, 1)'
    }
  }

  return (
    <Layouts
      title={'Olympics Athletes by Height and Weight'}
      description={
        'Olympics Athletes by Height and Weight taking part in the London 2012 Games'
      }
      url={
        'https://www.theguardian.com/sport/datablog/2012/aug/07/olympics-2012-athletes-age-weight-height#data'
      }
      dataSource={'The Guardian'}
    >
      <div>
        <Scatter data={chartData} options={scatterOptions} />
      </div>
    </Layouts>
  )
}
