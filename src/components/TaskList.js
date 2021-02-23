import React, {useState} from 'react';
import TodoForm from './TodoForm';

function TaskList() {

    const [todos, setTodos] = useState([]);

    const addTodo= todo =>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return
        }

        const newTodos=[todo, ...todos]

        setTodos(newTodos)
        console.log(...todos);
    }
    return (
        <div>
            <h1>What's the plan for today?</h1>
            <TodoForm />
        </div>
    );
}

export default TaskList;
