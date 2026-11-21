import { useState } from 'react'
import { UploadCloud, FileText } from 'lucide-react'

export default function FileUpload({ onFileSelect }) {
  const [file, setFile] = useState(null)

  const handleFile = (selected) => {
    if (!selected) return

    const allowed = ['application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain']

    if (!allowed.includes(selected.type)) {
      alert('Please upload a PDF, DOCX or TXT file.')
      return
    }

    setFile(selected)
    onFileSelect?.(selected)
  }

  return (
    <div className="upload-box">
      <input
        type="file"
        accept=".pdf,.docx,.txt"
        id="file-upload"
        hidden
        onChange={e => handleFile(e.target.files[0])}
      />

      <label htmlFor="file-upload" className="upload-label">
        {file ? <FileText size={45}/> : <UploadCloud size={48}/>}
        <h3>{file ? file.name : 'Drop your document here'}</h3>
        <p>Choose PDF, DOCX or TXT files</p>
        <span className="btn btn-primary">Browse Files</span>
      </label>
    </div>
  )
}
