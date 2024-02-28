import { useState } from "react";
import Checkbox from "../../buttons/checkbox";
import styles from "./ToDoItem.module.css";
import { TodosMutations } from "../../../../api/v1/todos";
import StandardBtn from "../../buttons/standard-btn/StandardBtn";
import ToDoEditItem from "./todo-edit-item";

function ToDoItem({ todo }) {
  const [isDone, setIsDone] = useState(todo.isDone);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  async function onClickDone() {
    const currentIsDone = isDone;
    try {
      setIsDone(!currentIsDone);
      await TodosMutations.markTodo(todo.id, !isDone);
    } catch (e) {
      setIsDone(currentIsDone);
    }
  }

  async function onClickDelete() {
    try {
      setIsDeleted(true);
      await TodosMutations.deleteTodo(todo.id);
    } catch (e) {
      setIsDeleted(false);
    }
  }

  async function onClickEdit() {
    setIsEditMode(true);
  }

  if (isDeleted) return null;

  if (isEditMode) {
    return <ToDoEditItem todo={todo} setIsEditMode={setIsEditMode} />;
  } else {
    return (
      <div className={styles.mainContainer}>
        <h1>ToDo-Item</h1>
        <div className={styles.horizontalLine}></div>
        <p>Aufgabe: {todo.task}</p>
        <p>DueDate: {new Date(todo.DueDate).toDateString()}</p>
        <label>
          Geschafft: <Checkbox isChecked={isDone} onClick={onClickDone} />
        </label>

        <StandardBtn text={"DELETE"} onClick={onClickDelete} />
        <StandardBtn text={"EDIT"} onClick={onClickEdit} />
      </div>
    );
  }
}

export default ToDoItem;
