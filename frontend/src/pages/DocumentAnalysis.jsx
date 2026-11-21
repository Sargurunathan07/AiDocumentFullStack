import { useLocation } from 'react-router-dom'
import { BrainCircuit, FileText, ListTodo } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function DocumentAnalysis() {
  const { state } = useLocation()
  const document = state?.document

  return (
    <>
      <Navbar/>
      <div className="app-layout">
        <Sidebar/>
        <main className="dashboard">
          <span className="eyebrow">AI DOCUMENT INTELLIGENCE</span>
          <h1>Document Analysis</h1>
          <p>Understand your document through AI-powered insights.</p>

          <div className="analysis-panel">
            <FileText size={30}/>
            <h2>{document?.fileName || document?.name || 'Document Analysis'}</h2>
            <p>Document analysis will appear here after backend integration.</p>
          </div>

          <div className="summary-grid">
            <div className="analysis-card">
              <BrainCircuit/>
              <h3>AI Summary</h3>
              <p>Your document summary will appear here.</p>
            </div>
            <div className="analysis-card">
              <FileText/>
              <h3>Key Information</h3>
              <p>Important information will be extracted here.</p>
            </div>
            <div className="analysis-card">
              <ListTodo/>
              <h3>Action Items</h3>
              <p>Tasks and deadlines will appear here.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
