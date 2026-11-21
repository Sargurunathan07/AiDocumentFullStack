import { useEffect, useState } from 'react'
import { getDocuments } from '../services/documentService'

export default function useDocuments() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getDocuments()
      .then(setDocuments)
      .catch(() => setError('Unable to fetch documents'))
      .finally(() => setLoading(false))
  }, [])

  return { documents, loading, error }
}
