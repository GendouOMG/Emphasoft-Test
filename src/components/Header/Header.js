import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../../assets/images/logo.png';

function Header({ sessionToken, setSessionToken }) {
  return (
    <div className="Header">
      <div className="Header__nav-wrapper">
        <NavLink to="/" className="Header__logo-link">
          <img className="Header__logo" src={logo} alt="Logo"></img>
        </NavLink>

      </div>
      
      <div className="Header__sub-nav-wrapper">
        <div className="Header__contacts">
          <p className="Header__phone">+7 (495) 2XX-77-69 </p>
          <button className="Header__call-back">Заказать звонок</button>
        </div>
        <div className="Header__sub-nav">
          <NavLink className="Header__nav-link" to="/userlist">Список</NavLink>
          {sessionToken !== false
            ? <button onClick={()=>setSessionToken(false)} className="Header__nav-link">Выйти</button>
            : <NavLink className="Header__nav-link" to="/login">Войти</NavLink>
          }
          <NavLink
            className={sessionToken !== false
                ? "Header__sub-nav-btn Header__sub-nav-btn--green"
                : "Header__sub-nav-btn"
              }
            to="/login">
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Header;