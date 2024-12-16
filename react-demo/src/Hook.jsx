import { useState } from "react";

function Hook() {
  const [count,setCount]=useState(0)

  const increment=()=>{
    setCount((c)=>c+1)
  }
  const decrement=()=>{
    setCount((c)=>c-1)
  }
  

    return (
    <>
     <p>Compteur: {count}</p>
     <button onClick={increment}>Incrémenter</button>
     <button onClick={decrement}>Décrémenter</button>
    </>
  )
}

export default Hook
