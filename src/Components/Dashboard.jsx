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
        <ElectionDetails />
        <CountDownTimer />
      </div>
    </div>
  )
}

export default Dashboard