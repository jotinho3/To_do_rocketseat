import styles from "../styles/Main.module.css";
import { Task } from "./Task";
import {FormEvent, useState, ChangeEvent} from "react"


const taskJson = [
  {
    id: "1",
    content: "Passear com o cachorro",
    isDone: false
  },
  {
    id: "2",
    content: "Passear com o gato",
    isDone: false
  },
  {
    id: "3",
    content: "Passear com a cobra",
    isDone: false
  }
]







export function Main() {

// useState que tem o valor inicial das tarefas com um objeto pré-criado, setNewTasks como função atualizadora
  const [tasks, setNewTasks] = useState(taskJson);
  
// useState que tem o valor inicial do campo vazio do input para o usuário inserir a nova tarefa, esse valor está atrelado ao value={newTaskText} do input principal, setNewTaskText recebe event.terget.value do input!(linha53)
  const [newTaskText, setNewTaskText] = useState('');

  const [totalDoneTasks, setTotalDoneTasks] = useState(0)


function handleCreateNewTask(event: FormEvent) {
  event.preventDefault();

  //Spread operator de tasks, já que useState não atualiza o valor em uma mémoria já criada, precisamos criar uma nova mémoria utilizando o valor da antiga
  setNewTasks([...tasks, {
    id: ((tasks.length + 1).toString()),
    content: (newTaskText),
    isDone: false
  }]);

  
  setNewTaskText('');
  
}


// Essa função realiza a captura constante do valor do input da tarefa, é necessário capturar o evento no parâmetro dessa função e importar o tipo de evento para o TS não reclamar
function handleNewTaskChange(event: ChangeEvent<HTMLInputElement> ) {
  setNewTaskText(event.target.value)
}

function deleteTask(taskToDelete: string) {
  const tasksWithoutDeletedOne = tasks.filter(task => {
    return task.id !== (taskToDelete)

  })


  setNewTasks(tasksWithoutDeletedOne)
  
  if (totalDoneTasks !== 0) {
    setTotalDoneTasks(totalDoneTasks - 1)
  }


}



function countTotalDone(itIsDone: boolean){
  if (itIsDone == false) {
    setTotalDoneTasks(totalDoneTasks + 1)
  }
  else if (itIsDone == true){
    setTotalDoneTasks(totalDoneTasks - 1)
  }
}




  return (
    
    <div className={styles.wrapper}>

      <div> 
        <form className={styles.formCreateNewTask} id="formCreateNewTask">
          {/* foi atribuido value={newTaskText} no input pois na função handleCreateNewTask(linha37) no final de sua execução o valor do input deve zerar e refletir imediatamente na interface do usuário */}
          <input type="text" placeholder="Adicione uma nova tarefa aqui..." onChange={handleNewTaskChange} value={newTaskText} />
          <button type="submit" onClick={handleCreateNewTask}><strong>Criar</strong></button>
        </form>
      </div>

      <div className={styles.taskDoneAndCreated}>
        <div className={styles.taskDoneAndCreatedFlex}><p>Tarefas criadas</p><span>{tasks.length}</span></div>
        <div className={styles.taskDoneAndCreatedFlex}><p>Tarefas concluídas</p><span>{totalDoneTasks} de {tasks.length}</span></div>
        
      </div>

     <div className={styles.lineSeparator}></div>
{/* é aqui que está a lógica para inserir novas tarefas na página, fazemos um map do tasks, que é o state mais atual da lista das tarefas no total, o map precisa de um return, por favor não esquecer de novo >:( ) */}
     {tasks.map(task => {
      return (
        <Task
         id={task.id}
         content={task.content}
         onDeleteTask={deleteTask}
         onCheckIsDone={countTotalDone}
         
      
      />
      )
      

     })}


    </div>
  )

    }
