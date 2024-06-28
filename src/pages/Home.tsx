import { CardContainer, Container } from './styles'
import { Header } from '../components/Layout/Header'
import { Card } from '../components/Card'
import barChart from '../assets/barChart.png'
import lineChart from '../assets/lineChart.png'
import scatterChart from '../assets/scatterChart.png'
import radarChart from '../assets/radarChart.png'

export interface CardData {
  link: string
  image: string
  title: string
  chartType: string
}

export const Home = () => {
  const cardData: CardData[] = [
    {
      link: '/birth-rate',
      image: lineChart,
      title: 'Birth Rates of East Asia (CJK)',
      chartType: 'Line Chart',
    },
    {
      link: '/world-population',
      image: barChart,
      title: 'Top 20 Countries by Population',
      chartType: 'Bar Chart',
    },
    {
      link: '/olympics-athletes',
      image: scatterChart,
      title: 'Olympics Athletes by Height & Weight',
      chartType: 'Scatter Chart',
    },
    {
      link: '/pokemon',
      image: radarChart,
      title: 'Pokémon Statistics',
      chartType: 'Radar Chart',
    },
  ]

  return (
    <Container>
      <Header
        title={'Various Charts'}
        description="Data Visualization with React and Chart.js"
      />
      <CardContainer>
        {cardData.map((card, index) => (
          <Card
            key={index}
            link={card.link}
            image={card.image}
            title={card.title}
            chartType={card.chartType}
          />
        ))}
      </CardContainer>
    </Container>
  )
}
