import { useState } from "react"

function Form() {
  const [firstname, setFirstname]=useState('jhon')

  const handleChange=(e)=>{
    setFirstname(e.target.value)
  }

  const reset=()=>{
    setFirstname('')
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  //----------------
  const [value, setValue]=useState('')
  const handleMoove =(e)=>{
    setValue(e.target.value)
  }
  const[checked,setChecked]=useState(false)
  const toggleCheck = () => {
    setChecked(!checked)
  }
  return (
    <>
    <h2>champ controlé par react</h2>
      <form >
        <input type="text" name="firstname" value={firstname} onChange={handleChange}/>
        <button onClick={reset} type="button">Reset</button>
      </form>
    <h2>champ non controlé par react</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstname"defaultValue="test"/>
        <button >Envoyer</button>
      </form>
      <h2>area et check</h2>
      <form>
        <textarea value={value} onChange={handleMoove}></textarea>
        <input type="checkbox" checked={checked} onChange={toggleCheck} />
        <button disabled={!checked}>Envoyer</button>
      </form>
    </>
  )
}

export default Form
