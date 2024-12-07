import { NavLink } from "react-router-dom";
import BtnDarkMode from '../btnDarkMode/BtnDarkMode';
import './style.css'




const Navbar = () => {

    const activeLink = 'nav-list__link nav-list__link--active'; 
    const normLink = 'nav-list__link'; 
    
    return (<nav className="nav">
        <div className="container">
            <div className="naw-row">
                <NavLink to="/" className="logo">
                    Terny<strong>GYM</strong>
                </NavLink>

                <BtnDarkMode />

                <ul className="naw-list">
                    <li className="nav-list__item">
                        <NavLink to="/" className={({isActive})=> isActive ? activeLink : normLink }>
                            Home
                        </NavLink></li>
                    <li className="nav-list__item">
                        <NavLink to="/News" className={({isActive})=> isActive ? activeLink : normLink }>
                            News
                        </NavLink></li>
                    <li className="nav-list__item">
                        <NavLink to="/contacts" className={({isActive})=> isActive ? activeLink : normLink }>
                            About
                        </NavLink></li>
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;