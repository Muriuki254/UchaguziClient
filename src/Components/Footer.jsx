import './style.css'
import { FcCopyright,FcCalendar } from 'react-icons/fc';
import facebook from '../assets/icon-facebook.svg'
import instagram from '../assets/icon-instagram.svg'
function Footer() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className="footer">
      <div>
        <p><FcCopyright/> Ian Muriuki </p> 
        <p><FcCalendar/> {currentDate}</p>  
      </div>
      <div>
        <p><img src={facebook}/></p>
        <p><img src={instagram}/></p>
      </div>
      <div>
        <p>Email: info@netzillsolutions.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>


    </footer>
  );
}

export default Footer;
