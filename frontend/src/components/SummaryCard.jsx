export default function SummaryCard({ title, value, description, icon }) {
  return (
    <div className="summary-card">
      <div className="summary-top">
        <span>{title}</span>
        <span className="summary-icon">{icon}</span>
      </div>
      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  )
}
