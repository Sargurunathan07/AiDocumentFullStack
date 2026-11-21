import { useState } from 'react'
import { CheckCircle2, Circle, ListTodo } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function ActionItems() {
  const [tasks, setTasks] = useState([])

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  return (
    <>
      <Navbar/>
      <div className="app-layout">
        <Sidebar/>
        <main className="dashboard">
          <span className="eyebrow">TASK MANAGEMENT</span>
          <h1>Action Items</h1>
          <p>Track important tasks extracted from your documents.</p>

          <div className="analysis-panel">
            <ListTodo size={35}/>
            <h2>Extracted Tasks</h2>
            {tasks.length === 0 ? (
              <p>No action items available. Analyze a document first.</p>
            ) : tasks.map(task => (
              <div className="task-item" key={task.id}>
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? <CheckCircle2/> : <Circle/>}
                </button>
                <span>{task.title}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
