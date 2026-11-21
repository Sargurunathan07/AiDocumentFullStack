import { FileText, ArrowRight, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DocumentCard({ document, onDelete }) {
  const formattedDate = document.uploadedAt
    ? new Date(document.uploadedAt).toLocaleString()
    : 'Recently uploaded'

  return (
    <div className="document-card">
      <div className="document-icon">
        <FileText size={25} />
      </div>

      <div className="document-info">
        <h3>{document.originalFilename}</h3>
        <p>{formattedDate}</p>
        <span className="status">Uploaded</span>
      </div>

      <div className="document-actions">
        <Link to="/analysis">
          <ArrowRight size={19} />
        </Link>

        <button onClick={() => onDelete?.(document.id)}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
