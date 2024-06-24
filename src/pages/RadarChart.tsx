import { Radar } from 'react-chartjs-2'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  RadarController,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  RadialLinearScale,
  LogarithmicScale,
  ChartOptions,
  Filler,
  ChartData,
} from 'chart.js'
import { Layouts } from '../components/Layout/Layouts'
import { RadarWrapper } from './styles'
import { Select } from '../components/Select'
import { RADARCHARTOPTION } from '../constants/selectOption'
import { useSelect } from '../hooks/useSelect'

ChartJS.register(
  RadarController,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  TimeScale,
  TimeSeriesScale,
  RadialLinearScale,
  LogarithmicScale,
  Filler
)

interface PokemonStat {
  label: string
  value: number
}

interface PokemonData {
  name: string
  stats: PokemonStat[]
  image: string
}

export const RadarChart: React.FC = () => {
  const [sortBy, setSortBy] = useSelect('pikachu')
  const [pokemonData, setPokemonData] = useState<{
    [key: string]: PokemonData
  }>({
    pikachu: { name: '', stats: [], image: '' },
    squirtle: { name: '', stats: [], image: '' },
    charmeleon: { name: '', stats: [], image: '' },
    bulbasaur: { name: '', stats: [], image: '' },
  })

  useEffect(() => {
    const fetchData = async () => {
      const pokemons = [
        { name: 'pikachu', id: 25 },
        { name: 'squirtle', id: 7 },
        { name: 'charmeleon', id: 5 },
        { name: 'bulbasaur', id: 1 },
      ]
      try {
        for (const pokemon of pokemons) {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          )
          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`
          )
          const koreanName =
            speciesResponse.data.names.find(
              (name: { language: { name: string }; name: string }) =>
                name.language.name === 'ko'
            )?.name || pokemon.name

          const stats: PokemonStat[] = response.data.stats.map(
            (stat: { stat: { name: string }; base_stat: number }) => ({
              label: stat.stat.name,
              value: stat.base_stat,
            })
          )
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
          setPokemonData((prev) => ({
            ...prev,
            [pokemon.name]: { name: koreanName, stats, image },
          }))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const selectedPokemonData = pokemonData[sortBy]
  const labels = selectedPokemonData.stats?.map((ability) => ability.label)

  const getBackgroundColor = (label: string): string => {
    switch (label) {
      case 'pikachu':
        return 'rgba(255, 206, 86, 0.6)'
      case 'squirtle':
        return 'rgba(54, 162, 235, 0.6)'
      case 'charmeleon':
        return 'rgba(255, 99, 132, 0.6)'
      case 'bulbasaur':
        return 'rgba(75, 192, 192, 0.6)'
      default:
        return 'rgba(75, 192, 192, 0.6)'
    }
  }

  const getBorderColor = (label: string): string => {
    switch (label) {
      case 'pikachu':
        return 'rgba(255, 206, 86, 1)'
      case 'squirtle':
        return 'rgba(54, 162, 235, 1)'
      case 'charmeleon':
        return 'rgba(255, 99, 132, 1)'
      case 'bulbasaur':
        return 'rgba(75, 192, 192, 1)'
      default:
        return 'rgba(75, 192, 192, 1)'
    }
  }

  const data: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        label: selectedPokemonData.name,
        data: selectedPokemonData?.stats?.map((ability) => ability.value),
        backgroundColor: getBackgroundColor(sortBy),
        borderColor: getBorderColor(sortBy),
        borderWidth: 1,
      },
    ],
  }

  const options: ChartOptions<'radar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  return (
    <Layouts
      title={'Pokémon Statistics'}
      description={
        'Detailed Analysis of Six Key Stats (HP, Speed, Attack, Defense, etc.)'
      }
      url={'https://pokeapi.co/'}
      dataSource={'PokéAPI'}
    >
      <Select onChange={setSortBy} value={sortBy} options={RADARCHARTOPTION} />
      <RadarWrapper>
        <div className="image">
          <img src={selectedPokemonData.image} alt={`${sortBy} 이미지`} />
        </div>
        <Radar data={data} options={options} />
      </RadarWrapper>
    </Layouts>
  )
}
