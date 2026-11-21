import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Upload, BrainCircuit, ListTodo } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import SummaryCard from '../components/SummaryCard'
import DocumentCard from '../components/DocumentCard'
import { getDocuments, deleteDocument } from '../services/documentService'

export default function Dashboard() {
  const [documents, setDocuments] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDocuments()
      .then(data => {
        console.log('React received documents:', data)
        setDocuments(data)
      })
      .catch(err => {
        console.error('Document fetch failed:', err)
        setError(err.message || 'Unable to fetch documents')
      })
      .finally(() => setLoading(false))
  }, [])

  const removeDocument = async (id) => {
    try {
      await deleteDocument(id)
      setDocuments(prev => prev.filter(doc => doc.id !== id))
    } catch {
      alert('Unable to delete document.')
    }
  }

  return (
    <>
      <Navbar />
      <div className="app-layout">
        <Sidebar />
        <main className="dashboard">
          <div className="page-header">
            <div>
              <span className="eyebrow">OVERVIEW</span>
              <h1>Dashboard</h1>
              <p>Welcome to your document intelligence workspace.</p>
            </div>
            <Link to="/upload" className="btn btn-primary">
              <Upload size={18} /> Upload Document
            </Link>
          </div>

          <div className="summary-grid">
            <SummaryCard title="Total Documents" value={documents.length}
              description="Uploaded documents" icon={<FileText />} />
            <SummaryCard title="Analyzed Documents" value="0"
              description="Successfully analyzed" icon={<BrainCircuit />} />
            <SummaryCard title="Action Items" value="0"
              description="Tasks extracted" icon={<ListTodo />} />
          </div>

          <section className="recent-section">
            <div className="section-header">
              <h2>Recent Documents</h2>
              <Link to="/upload">View all / Upload</Link>
            </div>

            {loading ? (
              <p>Loading documents...</p>
            ) : error ? (
              <p>{error}</p>
            ) : documents.length > 0 ? (
              documents.map(doc => (
                <DocumentCard key={doc.id} document={doc}
                  onDelete={removeDocument} />
              ))
            ) : (
              <div className="empty-state">
                <FileText size={45} />
                <h3>No documents yet</h3>
                <p>Upload your first document to get started.</p>
                <Link to="/upload" className="btn btn-primary">
                  <Upload size={18} /> Upload Now
                </Link>
              </div>
            )}
          </section>
          <Footer />
        </main>
      </div>
    </>
  )
}
