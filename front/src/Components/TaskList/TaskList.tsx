import TaskItem from '../TaskItem/TaskItem'
import { ITask } from '../../types/task'
import { FC } from 'react'

interface ITaskListProps {
  tasks: ITask[]
}

const TaskList: FC<ITaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  )
}

export default TaskList
