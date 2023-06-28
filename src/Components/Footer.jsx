import './style.css'
import { FcCopyright,FcCalendar } from 'react-icons/fc';
function Footer() {
  const currentDate = new Date().toLocaleDateString();

  return (
    <footer className="footer">
      <div>
        <p>Email: info@netzillsolutions.com</p>
        <p>Phone: +1 123-456-7890</p>
      </div>
      <div>
        <p><FcCopyright/> Ian Muriuki </p> 
        <p><FcCalendar/> {currentDate}</p>
      </div>
      <div>
        <p>Biashara Street</p>
        <p>Nairobi, Kenya</p>
      </div>


    </footer>
  );
}

export default Footer;
