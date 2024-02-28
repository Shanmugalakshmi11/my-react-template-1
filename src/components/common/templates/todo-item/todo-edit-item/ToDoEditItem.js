import { useState } from "react";
import Checkbox from "../../../buttons/checkbox";
import styles from "./ToDoEditItem.module.css";
import { TodosMutations } from "../../../../../api/v1/todos";
import StandardBtn from "../../../buttons/standard-btn/StandardBtn";

function ToDoEditItem({ todo, setIsEditMode }) {
  const [isDone, setIsDone] = useState(todo.isDone);
  const [task, setTask] = useState(todo.task);
  const [dueDate, setDueDate] = useState(todo.DueDate);

  async function onClickSendUpdate() {
    await TodosMutations.updateTodo(todo.id, task, isDone, dueDate);
    setIsEditMode(false);
  }

  return (
    <div className={styles.mainContainer}>
      <h1> EDIT </h1>
      <div className={styles.horizontalLine}></div>

      <input
        type="text"
        value={task}
        onChange={(event) => setTask(event.target.value)}
      ></input>
      <input
        type="text"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      ></input>
      <Checkbox
        isChecked={isDone}
        onClick={() => setIsDone(!isDone)}
      ></Checkbox>
      <StandardBtn text={"SEND"} onClick={onClickSendUpdate} />
    </div>
  );
}

export default ToDoEditItem;
