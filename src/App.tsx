import { useConfirm } from "./hooks"
import './App.css'

function App() {
  const {ask} = useConfirm({
    onConfirm: () => alert("Confirmed")
  })

  return (
    <div className="card">
      <button onClick={ask} >
        You wanna check it?
      </button>
    </div>
  )
}

export default App
