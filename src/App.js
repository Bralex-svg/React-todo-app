import './App.css';
import {useState, useRef} from 'react'


export default  function App() {

  const [todos, setTodos] = useState([
    {id: 1, text: "Learn React js", done: false},
    {id: 2, text: "Learn Vue js", done: false},
    {id: 3, text: "Learn Angular js", done: false}
  ]
   ) ;

 
  return (
    <div className="App">
     <h1>React Todo App</h1>
     <AddTodo setTodos = {setTodos} />
     <TodoList setTodos = {setTodos} todos = {todos} />
    </div>
  );
  
  
}

function TodoList({todos, setTodos}){
  function handleToggleTodo(todo){
    const updatedTodo = todos.map((t) =>
    t.id === todo.id
    ? {
      ...t,
      done: !t.done
    }
    : t )
   setTodos(updatedTodo)
  }
  if(!todos.length){
    return <p>No todos left!</p>
  }

return(
  <div>
  
   {todos.map((todo) =>(
     <li 
     onDoubleClick={() => handleToggleTodo(todo)}
     style={{
       textDecoration: todo.done ? "line-through" : ""}} 
       key={todo.id}>{todo.text}
       <DeleteTodo todo={todo} setTodos={setTodos}/>
       </li>
   ))}
  </div>
)
}


function DeleteTodo({todo, setTodos}){
function handleDeleteTodo(){
  const confirmed = window.confirm("Do you want to delete this?");
  if(confirmed){
setTodos((prevTodo) =>{
  return prevTodo.filter((t) => t.id !== todo.id);
})
  }
}

  return(
<span
onClick={handleDeleteTodo}
role="button" style={{
  color: "red",
  fontWeight: 'bold',
  marginLeft: 10,
  cursor: 'pointer'
}}>
  X</span>
  )
}



//Component to add todo

function AddTodo({setTodos}){
  const inputRef = useRef()
  function handleAddTodo(event){
  event.preventDefault()
 const text = event.target.elements.AddTodo.value;

 const todo = {
   id: 4,
   text,
   done: false
 };

 
 setTodos((prevTodo) =>{
  return prevTodo.concat(todo)
})
inputRef.current.value = ""
  }
  return(
    <div>
   <form onSubmit={handleAddTodo}>
     <input name = "AddTodo" type="text" ref={inputRef} placeholder="Add Todo"/>
     <button type="submit">Submit</button>
   </form>
    </div>
  )
}



