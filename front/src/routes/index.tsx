import { lazy, JSX } from 'react'

interface Route {
  path: string
  element: JSX.Element
}

interface Routes {
  routes: Route[]
}

const Tasks = lazy(() => import('../pages/Tasks/Tasks'))
const TaskDetailPage = lazy(
  () => import('../pages/TaskDetailPage/TaskDetailPage')
)

export const routes: Routes = {
  routes: [
    {
      path: '/',
      element: <Tasks />,
    },
    {
      path: '/task/:taskId',
      element: <TaskDetailPage />,
    },
  ],
}
