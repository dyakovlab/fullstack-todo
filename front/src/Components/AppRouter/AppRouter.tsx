import { Routes, Route } from 'react-router-dom'
import { routes } from '../../routes'
import { LoadingBlock } from './constants'
import { Suspense } from 'react'

const AppRouter = () => {
  return (
    <Routes>
      {routes.routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Suspense fallback={LoadingBlock}>{route.element}</Suspense>}
        />
      ))}
    </Routes>
  )
}

export default AppRouter
