import { StyledSelect } from './styles'

interface SelectProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select: React.FC<SelectProps> = ({ value, options, onChange }) => {
  return (
    <StyledSelect>
      <select onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </StyledSelect>
  )
}
