import { StyledHeader } from './styles'

interface HeaderProps {
  title: string
  description?: string
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  title,
  className,
  description,
}) => {
  return (
    <StyledHeader className={className}>
      <h1>{title}</h1>
      <small>{description}</small>
    </StyledHeader>
  )
}
