declare interface BirthRateResponse {
  code: string
  country: string
  iso3: string
  populationCounts: PopulationCounts
}

declare interface PopulationCounts {
  date: number
  value: number
}
