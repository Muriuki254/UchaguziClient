import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from './context/userContext/Context'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import Register from './Components/Register'
import Login from './Components/Login'
import Footer from './Components/Footer'
import NotFound from './Components/NotFound'
import AdminDashboard from './Pages/AdminPages/AdminDashboard'
import AdminHome from './Pages/AdminPages/AdminHome'
import CandidateManagement from './Pages/AdminPages/CandidateManagement'
import ElectionManagement from './Pages/AdminPages/ElectionManagement'
import VoterManagement from './Pages/AdminPages/VoterManagement'
import Positions from './Pages/AdminPages/Positions'
import AdminProfile from './Pages/AdminPages/AdminProfile'
import VoterDashboard from './Pages/VoterPages/VoterDashboard'
import ActiveElection from './Pages/VoterPages/ActiveElection'
import VoterHome from './Pages/VoterPages/VoterHome'
import VoteCasting from './Pages/VoterPages/VoteCasting'
import VotingHistory from './Pages/VoterPages/VotingHistory'
import VoterProfile from './Pages/VoterPages/VoterProfile'



function App() {
  const { user } = useContext(Context);

  return (
    <>
     <Navbar />
     <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/auth/register" element={<Register />}/>
        <Route path="/admin" element={user && user.isAdmin ? <AdminHome/> : <Login/>} >
          <Route path="dashboard" element={<AdminDashboard />}/>
          <Route path="candidates" element={<CandidateManagement />}/>
          <Route path="positions" element={<Positions />}/>
          <Route path="election" element={<ElectionManagement />}/>
          <Route path="voters" element={<VoterManagement />}/>
          <Route path="profile" element={<AdminProfile />}/>
        </Route>
        <Route path="/voter" element={user ? <VoterHome /> : <Login />}>
          <Route path="dashboard" element={<VoterDashboard />}/>
          <Route path="vote-casting" element={<VoteCasting />}/>
          <Route path="active-election" element={<ActiveElection />}/>
          <Route path="voting-history" element={<VotingHistory />}/>
          <Route path="profile" element={<VoterProfile />}/>
        </Route>
        <Route path="*" element={<NotFound />}/>
     </Routes>
     <Footer />
    </>
  )
}

export default App;
