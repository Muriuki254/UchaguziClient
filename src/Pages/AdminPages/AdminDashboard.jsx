import ElectionResults from "./ElectionResults"
import ElectionStatistics from "./ElectionStatistics"

function AdminDashboard() {
  return (
    <div>
      <ElectionStatistics />
      <ElectionResults />
    </div>
  )
}

export default AdminDashboard