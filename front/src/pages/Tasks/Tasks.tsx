import { FC, Fragment, useState, useEffect } from 'react'
import TaskList from '../../Components/TaskList/TaskList'
import TaskService from '../../api/taskService'
import TaskCreate from '../../Components/TaskCreate/TaskCreate'
import { socket } from '../../socket'
import { ITask } from '../../types/task'

const Tasks: FC = (): JSX.Element => {
  const [tasks, setTasks] = useState<ITask[]>([])

  const createTaskHandle = async (text: string): Promise<void> => {
    if (text.length) {
      await TaskService.create({ text })
    }
  }

  useEffect(() => {
    socket.on('tasks', (data) => {
      const receivedTasks: ITask[] | undefined = data?.data?.tasks
      if (receivedTasks) {
        setTasks(receivedTasks)
      }
    })
    socket.emit('tasks')
  }, [])

  return (
    <Fragment>
      <div>
        <TaskList tasks={tasks} />
      </div>
      <TaskCreate createTaskHandle={createTaskHandle} />
    </Fragment>
  )
}

export default Tasks
