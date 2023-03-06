import { useDispatch } from 'react-redux'
import { updateTodo } from '../redux'
import styles from './Todo.module.css'


const todo = ({ id, isSelected, message, editTodo }) => {
    const dispatch = useDispatch()
    return (
        <div className={styles.todo}>
            <input type="checkbox" id={`checkbox${id}`} checked={isSelected} onChange={() => dispatch(updateTodo({ id, message, isSelected: !isSelected }))} />
            <label htmlFor={`checkbox${id}`}>{message}</label>
            <button onClick={() => editTodo(id)}>&#128393;</button>
        </div>
    )
}

export default todo