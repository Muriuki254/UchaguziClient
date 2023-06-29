import CountDownTimer from "./CountDownTimer";
import './style.css'

const ElectionDetails = () => {

  return (
    <>
      <h1>General Elections</h1>
    </>
  );

};


function Dashboard() {
  return (
    <div>
      <div className="dashboard-container">
        <CountDownTimer />
        <ElectionDetails />
      </div>
    </div>
  )
}

export default Dashboard