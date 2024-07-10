import { useState } from 'react'

export const useSelect = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value)
  }

  return [value, handleChange] as const
}
