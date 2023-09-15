import React, { FormEvent } from 'react'
import { buttonStyle } from '../../constants'

interface TaskCreateProps {
  createTaskHandle: (text: string) => void
}

const TaskCreate: React.FC<TaskCreateProps> = ({ createTaskHandle }) => {
  const onCreateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const taskText = e.currentTarget.task.value
    createTaskHandle(taskText)
    e.currentTarget.reset()
  }

  return (
    <form onSubmit={onCreateTask}>
      <input type="text" name="task" />
      <button style={buttonStyle} type="submit">
        Create
      </button>
    </form>
  )
}

export default TaskCreate
