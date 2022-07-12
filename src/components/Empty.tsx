import styles from './Empty.module.css'
import emptyTask from '../assets/emptyTask.png';

export function Empty() {
  return (
    <div className={styles.container}>
      <img src={emptyTask} alt="" />
      <div>
        <strong>Você ainda não tem tarefas cadastradas</strong>
        <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    </div>
  )
}