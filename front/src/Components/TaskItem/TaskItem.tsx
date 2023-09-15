import { FC, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskService from '../../api/taskService'
import { ITask } from '../../types/task'
import { buttonStyle, taskListItemStyle } from '../../constants'

type ITaskItemProps = {
  task: ITask
}

const TaskItem: FC<ITaskItemProps> = ({ task }) => {
  const [edit, setEdit] = useState(false)

  const onDeleteTask = async () => {
    await TaskService.delete(task._id)
  }

  const onUpdateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const taskText = e.currentTarget.task.value
    if (taskText.length) {
      await TaskService.update(task._id, { text: taskText })
    }
    setEdit(false)
  }

  return (
    <div>
      {!edit ? (
        <div style={taskListItemStyle}>
          <Link to={`/task/${task._id}`}>{task.text}</Link>{' '}
          <div>
            <button style={buttonStyle} onClick={onDeleteTask}>
              delete
            </button>
            <button style={buttonStyle} onClick={() => setEdit(true)}>
              edit
            </button>
          </div>
        </div>
      ) : (
        <form style={taskListItemStyle} onSubmit={onUpdateTask}>
          <input defaultValue={task.text} type="text" name="task" />
          <button style={buttonStyle} type="submit">
            Update
          </button>
        </form>
      )}
    </div>
  )
}

export default TaskItem
