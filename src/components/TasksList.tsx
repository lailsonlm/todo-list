import { useState } from 'react';
import styles from './TasksList.module.css'
import { TrashIcon } from './TrashIcon';

type TaskList = {
  id: string;
  task: string;
  isDone: boolean;
}

interface TasksListProps {
  task: TaskList;
  onDeleteTask: (taskId: string) => void;
  onChangeTaskIsDone: (taskId: string) => void;
}

export function TasksList({ task, onDeleteTask, onChangeTaskIsDone }: TasksListProps) {
  const [isChecked, setIsChecked] = useState(task.isDone)

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleChangeTask() {
    onChangeTaskIsDone(task.id);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.task}>
        <input 
          type="checkbox" 
          id={task.id} 
          onClick={handleChangeTask}
          onChange={event => setIsChecked(event.target.checked)}
          checked={isChecked}
        />
        <label htmlFor={task.id} />

        <p>{task.task}</p>

        <button
          onClick={handleDeleteTask}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}