import { useState } from 'react'
import styles from './app.module.css'
import Todo from './components/Todo'
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, clearAllTodo, clearSelectedTodos, updateTodo } from './redux';

const App = () => {
  const [inputBoxVal, setInputBoxVal] = useState('');
  const [idOfEditTodo, setIdOfEditTodo] = useState('');
  const todos = useSelector(store => store.todos);
  const dispatch = useDispatch()
  const addTodo = () => {
    if (!inputBoxVal) return;
    dispatch(addNewTodo({ message: inputBoxVal }))
    setInputBoxVal('');
    document.querySelector(`.${styles.inputContainer} input`).focus();
  }
  const editTodo = (id) => {
    setIdOfEditTodo(`${id}`);
    setInputBoxVal(todos[id].message);
    document.querySelector(`.${styles.inputContainer} input`).focus();
  }
  const saveEditTodo = () => {
    if (!inputBoxVal) return;
    dispatch(updateTodo({ ...todos[Number(idOfEditTodo)], message: inputBoxVal }));
    setInputBoxVal('');
    setIdOfEditTodo('');
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Daily To Do List</h1>
      <div className={styles.inputContainer}>
        <input type="text" placeholder='Add new list item' value={inputBoxVal} onChange={(e) => setInputBoxVal(e.target.value)} />
        <button onClick={idOfEditTodo ? saveEditTodo : addTodo}>{idOfEditTodo ? "Save" : "Add"}</button>
      </div>
      <div className={styles.todos}>

        {todos.length == 0 ? <p>You don't have any task here.</p> : todos.map((todo, key) => <Todo message={todo.message} id={todo.id} key={key} isSelected={todo.isSelected} editTodo={editTodo} />)}
      </div>
      <div className={styles.bottom}>
        <span>{todos.filter(todo => todo.isSelected).length} item selected</span>
        <span onClick={todos.filter(todo => todo.isSelected).length == 0 ? () => dispatch(clearAllTodo()) : () => dispatch(clearSelectedTodos())}>{todos.filter(todo => todo.isSelected).length == 0 ? "Clear All" : "Clear Selected"}</span>
      </div>
    </div>
  )
}

export default App