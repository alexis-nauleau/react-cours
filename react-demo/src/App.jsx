import Hook from './Hook.jsx'
import Form from './Form.jsx'


const title="Bonjour les gens ";
const handleClick=()=>{
  alert('clique')
};
const showTitle=false;
const todos=[
  "tache 1",
  "tache 2",
  "tache 3",
]

function App() {
  return (
    <>
       { showTitle && <h1  onClick={handleClick} style={{color:'red',backgroundColor:'blue',cursor:'pointer'}}>{title}</h1>}
       <ul style={{listStyleType:'none'}}>
        {todos.map(todo=>(<li key={todo}> {todo}</li>))}
       </ul>
       <Hook></Hook>
       <Form></Form>
    </>
  )
}

export default App
