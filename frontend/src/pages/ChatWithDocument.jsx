import { useState } from 'react'
import { Send, Bot, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { chatWithDocument } from '../services/documentService'

export default function ChatWithDocument() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!message.trim() || loading) return

    const question = message
    setMessages(prev => [...prev, { role:'user', text:question }])
    setMessage('')
    setLoading(true)

    try {
      const result = await chatWithDocument(question)
      setMessages(prev => [...prev, {
        role:'ai',
        text:result.answer || 'No answer returned.'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role:'ai',
        text:'Unable to connect to the AI service. Check your backend.'
      }])
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
          <span className="eyebrow">AI ASSISTANT</span>
          <h1>Chat With Document</h1>
          <p>Ask questions about your uploaded documents.</p>

          <div className="chat-container">
            <div className="chat-messages">
              {messages.length === 0 && (
                <div className="chat-welcome">
                  <Bot size={40}/>
                  <h3>How can I help you?</h3>
                  <p>Ask me anything about your document.</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div className={`chat-message ${msg.role}`} key={i}>
                  {msg.role === 'ai' ? <Bot/> : <User/>}
                  <p>{msg.text}</p>
                </div>
              ))}
              {loading && <p>AI is thinking...</p>}
            </div>

            <form className="chat-input" onSubmit={sendMessage}>
              <input value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Ask something about your document..."/>
              <button className="btn btn-primary" disabled={loading}>
                <Send size={18}/>
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  )
}
