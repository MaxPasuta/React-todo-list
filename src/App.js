import React, { useEffect } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";


function App() {
    const [todos, setTodos] = React.useState([
        {id: 1, title: 'купить говна', completed: true},
        {id: 2, title: 'купить каках', completed: false},
        {id: 3, title: 'купить жижи', completed: false}
    ])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/?_limit=90')
            .then(response => response.json())
            .then(todos => {
                setTodos(todos)
            })

    }, [])



    function toggleTodo(id) {
        setTodos(todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        )
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className="wrapper">
                <h1>List</h1>
                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo}/>
                ) : (
                    <p>No todos! </p>)}
            </div>
        </Context.Provider>
    );

}

export default App;
