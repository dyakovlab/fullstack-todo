import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskDetail from '../../Components/TaskDetail/TaskDetail'
import TaskService from '../../api/taskService'
import { ITask } from '../../types/task'

const TaskDetailPage: FC = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const [data, setData] = useState<ITask | null>(null)

  const fetchTask = useCallback(async (): Promise<void> => {
    if (!taskId) {
      return
    }
    try {
      const item: ITask | null = await TaskService.getById(taskId)
      if (item) {
        setData(item)
      }
    } catch (error) {
      console.error(error)
    }
  }, [taskId, setData])

  useEffect(() => {
    if (taskId) {
      fetchTask()
    }
  }, [taskId, fetchTask])

  return <div>{data && <TaskDetail task={data} />}</div>
}

export default TaskDetailPage
