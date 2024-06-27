import { StyledFooter } from './styles'

interface FooterProps {
  className?: string
  url: string
  dataSource: string
}

export const Footer: React.FC<FooterProps> = ({
  className,
  url,
  dataSource,
}) => {
  return (
    <StyledFooter className={className}>
      <p>
        Data Source:
        <cite>
          <a href={url} target="_blank">
            {dataSource}
          </a>
        </cite>
      </p>
      <p>&copy; 2024 Kayoung Kim</p>
    </StyledFooter>
  )
}
