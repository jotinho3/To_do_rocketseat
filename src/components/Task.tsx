import styles from "../styles/Task.module.css";
import { TrashSimple } from "phosphor-react";
import { useState } from "react";
import Swal from "sweetalert2";

interface TaskProps {
  id: string;
  content: string;
  onDeleteTask: (taskToDelete: string) => void;
  onCheckIsDone: (itIsDone: boolean) => void;
}

// Importante lembrar que é no local em que o componente é chamado que os valores de fato das suas propriedades serão passado (nesse caso, dentro do Main() )
// Importante lembrar que os useState, e todas as lógicas e funções por trás de um componente devem estar dentro do export function Componente()

export function Task({ id, content, onDeleteTask, onCheckIsDone }: TaskProps) {
  const [isDoneActualValue, setIsDoneValue] = useState(false);

  function handleDeleteTaskPopUp() {
    Swal.fire({
      title: "Você tem certeza?",
      text: "Não poderá reverter essa ação",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      width: 300,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Tarefa deletada!",
          text: "Tarefa deletada com sucesso",
          icon: "success",
          width: 300,
        });
        handleDeleteTask();
      }
    });
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleIsTaskDone() {
    setIsDoneValue(isDoneActualValue ? false : true);
  }

  function checkIsDone() {
    onCheckIsDone(isDoneActualValue);
  }

  return (
    <div className={isDoneActualValue ? styles.taskBoxDone : styles.taskBox}>

      <label className={styles.checkbox}>
        <input
          id={id}
          onClick={handleIsTaskDone}
          checked={isDoneActualValue}
          onChange={checkIsDone}
          type="checkbox"
        />
        <svg viewBox="0 0 21 18">
          <symbol
            id="tick-path"
            viewBox="0 0 21 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
              fill="none"
              stroke-width="2.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </symbol>
          <defs>
            <mask id="tick">
              <use className={styles.tickmask}href="#tick-path" />
            </mask>
          </defs>
          <use className={styles.tick} href="#tick-path" stroke="currentColor" />
          <path
            fill="white"
            mask="url(#tick)"
            d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"
          />
        </svg>
        <svg className={styles.lines} viewBox="0 0 11 11">
          <path d="M5.88086 5.89441L9.53504 4.26746" />
          <path d="M5.5274 8.78838L9.45391 9.55161" />
          <path d="M3.49371 4.22065L5.55387 0.79198" />
        </svg>
      </label>

      <p>{content}</p>
      <button title="Deletar a tarefa" onClick={handleDeleteTaskPopUp}>
        <TrashSimple size={20} />
      </button>
    </div>
  );
}
