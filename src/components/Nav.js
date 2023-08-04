import { useNavigate } from 'react-router-dom';
import '../assets/styles/Nav.css';
import logo from '../assets/images/Logo.png';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <div className='logo'>
        <img src={logo} alt='logo' />
        <h2>MatchMyRoomie</h2>
      </div>
      <div className='nav'>
        <li>
          Home
          {/* <Link to='/Main'>home</Link> */}
        </li>
        <li>
          About
          {/* <Link to='/About'>about</Link> */}
        </li>
        <li>
          Pricing
          {/* <Link to='/Pricing'>pricing</Link> */}
        </li>
        <li>
          Contact Us
          {/* <Link to='/ContactUs'>contact us</Link> */}
        </li>
      </div>
      <div className='log-in'>
        <button onClick={() => navigate('/SignIn')}>Sign In</button>
      </div>
    </div>
  );
}
export default Navbar;
