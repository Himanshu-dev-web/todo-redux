import { createSlice,nanoid } from "@reduxjs/toolkit";


const initialState = {
    todos:[
        {id:1,text:"hi there"},
        {id:2,text:"Welcome"},
        {id:3,text:"to Todo List App"},
        {id:4,text:"using redux"},


    ]
}

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo : (state,action) => {
            const todo={
                id:nanoid(),
                text:action.payload
            }
            console.log(todo);
            state.todos.push(todo);
        },
        removeTodo : (state,action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        updateTodo: (state,action) => {
            console.log(action.payload);
            const {id,text} = action.payload;
            const todo = state.todos.find((todo) => todo.id === id)
            if(todo){
                todo.text = text;
            }
        }
    }
})



export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;