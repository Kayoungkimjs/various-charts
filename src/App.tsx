import { Routes, Route } from 'react-router-dom'
import { BarChart, Home, LineChart, RadarChart, ScatterChart } from './pages'

interface RouteConfig {
  path: string
  element: React.ReactNode
}

export const App: React.FC = () => {
  const routes: RouteConfig[] = [
    { path: '/', element: <Home /> },
    { path: '/birth-rate', element: <LineChart /> },
    { path: '/world-population', element: <BarChart /> },
    { path: '/olympics-athletes', element: <ScatterChart /> },
    { path: '/pokemon', element: <RadarChart /> },
  ]

  return (
    <div className="app">
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}
