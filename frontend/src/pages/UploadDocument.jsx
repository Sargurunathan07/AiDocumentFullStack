import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import FileUpload from '../components/FileUpload'
import { uploadDocument } from '../services/documentService'

export default function UploadDocument() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a document first.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await uploadDocument(file)
      navigate('/analysis', { state: { document: result } })
    } catch {
      setError('Upload failed. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar/>
      <div className="app-layout">
        <Sidebar/>
        <main className="dashboard">
          <div className="page-header">
            <div>
              <span className="eyebrow">DOCUMENT MANAGEMENT</span>
              <h1>Upload Document</h1>
              <p>Upload your document and let AI understand it.</p>
            </div>
          </div>

          <div className="upload-container">
            <FileUpload onFileSelect={setFile}/>

            {error && <p className="error-message">{error}</p>}

            <div className="upload-details">
              <h3>Supported formats</h3>
              <p>PDF, DOCX and TXT</p>
              <p>Maximum file size: 10 MB (frontend guideline)</p>
            </div>

            <button className="btn btn-primary full-width"
              disabled={!file || loading} onClick={handleUpload}>
              {loading ? 'Uploading...' : 'Upload & Analyze'}
            </button>
          </div>
        </main>
      </div>
    </>
  )
}
