import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Empty } from './Empty'
import { PlusIcon } from './PlusIcon'
import styles from './Tasks.module.css'
import { TasksList } from './TasksList';

interface TaskList {
  id: string;
  task: string;
  isDone: boolean;
}

export function Tasks() {
  const [task, setTask] = useState('')
  const [tasksList, setTasksList] = useState<TaskList[]>([])
  const numberOfTasksDone = tasksList.filter(task => task.isDone === true)

  useEffect(() => {
    const storagedTasksList = window.localStorage.getItem('to-doList');

    if (storagedTasksList) {
      setTasksList(JSON.parse(storagedTasksList));
      }
  }, [])

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask = {
      id: uuidv4(),
      task: task,
      isDone: false
    }

    setTasksList([...tasksList, newTask])

    window.localStorage.setItem('to-doList', JSON.stringify([...tasksList, newTask]))

    setTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function changeTaskIsDone(taskId: string) {
    const newTasks = tasksList.map(task => {
      if(task.id === taskId) {
        return {
          ...task,
          isDone: !task.isDone
        }
      }

      return task
    })

    setTasksList(newTasks)

    window.localStorage.setItem('to-doList', JSON.stringify(newTasks))
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasksList.filter(task => {
      return task.id !== taskId;
    })

    setTasksList(tasksWithoutDeletedOne);

    window.localStorage.setItem('to-doList', JSON.stringify(tasksWithoutDeletedOne))
  }

  return (
    <div className={styles.container}>
      <form 
        onSubmit={handleCreateNewTask}
        className={styles.formNewTask}
      >
        <input 
          type="text" 
          placeholder='Adicione uma nova tarefa'
          onChange={handleNewTaskChange}
          value={task}
        />  
        <button
          type='submit'
          disabled={!task}
        >
          Criar
          <PlusIcon /> 
        </button>
      </form>    

      <main>
        <div className={styles.info}>
          <div className={styles.created}>
            Tarefas criadas <span className={styles.counter}>{tasksList.length}</span>
          </div>
          <div className={styles.done}>
          { tasksList.length !== 0 ? 
          <>
            Concluídas <span className={styles.counter}>{numberOfTasksDone.length} de {tasksList.length}</span>
          </>
          :  
          <>
            Concluídas <span className={styles.counter}>0</span>
          </>
          }
            
          </div>
        </div>

        { tasksList.length !== 0 ? 

          tasksList.map(task => {
            return (
              <TasksList 
                key={task.id} 
                task={task} 
                onDeleteTask={deleteTask}
                onChangeTaskIsDone={changeTaskIsDone}
              /> 
            )
          })
                
        : <Empty /> }
        
      </main>
    </div>
  )
}