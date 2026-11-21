import { Link } from 'react-router-dom'
import { FileText, BrainCircuit, Zap, ShieldCheck, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">✦ AI POWERED DOCUMENT INTELLIGENCE</span>
          <h1>Turn Complex Documents Into <span>Clear Actions.</span></h1>
          <p>
            Upload lengthy documents, extract important information,
            understand key insights and discover what needs to be done
            with the power of AI.
          </p>

          <div className="hero-buttons">
            <Link to="/upload" className="btn btn-primary">
              Get Started <ArrowRight size={18}/>
            </Link>
            <Link to="/dashboard" className="btn btn-outline">
              Explore Dashboard
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-card">
            <FileText size={35}/>
            <h3>Document Analysis</h3>
            <div className="visual-line"/>
            <div className="visual-line short"/>
            <div className="insight">
              <BrainCircuit/>
              <div>
                <strong>AI Insights</strong>
                <p>Key information extracted</p>
              </div>
            </div>
            <div className="insight">
              <Zap/>
              <div>
                <strong>Action Items</strong>
                <p>Tasks identified successfully</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Everything your documents need</h2>
        </div>

        <div className="feature-grid">
          <Feature icon={<FileText/>} title="Smart Summarization"
            description="Convert lengthy documents into simple and understandable summaries."/>
          <Feature icon={<BrainCircuit/>} title="AI Analysis"
            description="Extract important details, dates, decisions and key information."/>
          <Feature icon={<Zap/>} title="Action Extraction"
            description="Identify tasks, deadlines and important actions automatically."/>
          <Feature icon={<ShieldCheck/>} title="Easy Document Access"
            description="Manage and access your uploaded documents in one workspace."/>
        </div>
      </section>
    </div>
  )
}

function Feature({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
