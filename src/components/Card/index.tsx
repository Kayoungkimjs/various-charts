import { Link } from 'react-router-dom'
import { StyledCard, Wrapper } from './styles'

interface CardProps {
  link: string
  image: string
  title: string
  chartType: string
}

export const Card: React.FC<CardProps> = ({
  link,
  image,
  title,
  chartType,
}) => {
  const alt = `${title} chart`

  return (
    <StyledCard>
      <Wrapper image={image}>
        <Link to={link}>
          <img src={image} alt={alt} />
        </Link>
      </Wrapper>
      <h2>{title}</h2>
      <p>{chartType}</p>
    </StyledCard>
  )
}
