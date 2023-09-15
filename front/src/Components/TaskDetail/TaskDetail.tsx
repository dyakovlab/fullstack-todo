import { ITask } from '../../types/task'
import { FC } from 'react'

interface ITaskDetailProps {
  task: ITask
}

const TaskDetail: FC<ITaskDetailProps> = ({ task }) => {
  return <pre>{JSON.stringify(task, null, 2)}</pre>
}

export default TaskDetail
