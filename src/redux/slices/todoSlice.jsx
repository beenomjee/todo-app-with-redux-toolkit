import { createSlice } from "@reduxjs/toolkit";

const TodoSlice = createSlice({
    name: 'Todo',
    initialState: localStorage.getItem('MyTodos') ? JSON.parse(localStorage.getItem('MyTodos')) : [],
    reducers: {
        addNewTodo(state, action) {
            state.push({ id: state.length, message: action.payload.message, isSelected: false });
            setTodosInLocalStorage(state);
        },
        updateTodo(state, action) {
            state[action.payload.id] = action.payload;
            setTodosInLocalStorage(state);
        },
        clearAllTodo() {
            setTodosInLocalStorage([]);
            return [];
        },
        clearSelectedTodos(state) {
            let rslt = state.filter(todo => !todo.isSelected).map((todo, index) => ({ ...todo, id: index }));
            setTodosInLocalStorage(rslt);
            return rslt;
        }
    }
})

const setTodosInLocalStorage = (todos) => {
    localStorage.setItem('MyTodos', JSON.stringify(todos));
}

export const { addNewTodo, updateTodo, clearAllTodo, clearSelectedTodos } = TodoSlice.actions;
export default TodoSlice.reducer;