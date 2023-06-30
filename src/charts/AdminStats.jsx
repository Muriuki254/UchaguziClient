import { dataAdmin } from "../assets/sampleData"
import { LineChart,Line,XAxis,YAxis,Tooltip,AreaChart,Area,ResponsiveContainer,} from "recharts"

function AdminStats() {
  return (
    <div style={{width: "80%"}}>
        <div>
            <p>Aggregated Stats</p>
            <ResponsiveContainer width="100%" height={200}>
            <LineChart
                width={500}
                height={200}
                data={dataAdmin}
                syncId="anyId"
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="Rating" stroke="#8884d8" fill="#8884d8" />
            </LineChart>
            </ResponsiveContainer>            
        </div>
        <div>
            <p>Projections</p>
            <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                width={500}
                height={200}
                data={dataAdmin}
                syncId="anyId"
                margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="Approval" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
            </ResponsiveContainer>            
        </div>
    </div>
  )
}

export default AdminStats