import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BtnDarkMode from '../btnDarkMode/BtnDarkMode';
import './style.css'

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const activeLink = 'nav-list__link nav-list__link--active';
    const normLink = 'nav-list__link';

    // Перевірка авторизації при завантаженні
    useEffect(() => {
        const checkUser = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    // Silent fail - invalid user data
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        // Перевірити при завантаженні
        checkUser();

        // Слухати зміни в localStorage (для синхронізації між вкладками)
        const handleStorageChange = (e) => {
            if (e.key === 'user') {
                checkUser();
            }
        };

        // Слухати custom event для оновлення в тій же вкладці
        const handleUserChange = () => {
            checkUser();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('userChanged', handleUserChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userChanged', handleUserChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        // Dispatch custom event для оновлення navbar
        window.dispatchEvent(new Event('userChanged'));
        // Перенаправити на home
        navigate('/');
    };

    return (<nav className="nav">
        <div className="container">
            <div className="naw-row">
                <NavLink to="/" className="logo">
                    Terny<strong>GYM</strong>
                </NavLink>
                <BtnDarkMode />

                <ul className="naw-list">
                    <li className="nav-list__item">
                        <NavLink to="/" className={({ isActive }) => isActive ? activeLink : normLink}>
                            Home
                        </NavLink></li>

                    {/* Courses - тільки для авторизованих */}
                    {user && (
                        <li className="nav-list__item">
                            <NavLink to="/courses" className={({ isActive }) => isActive ? activeLink : normLink}>
                                Courses
                            </NavLink></li>
                    )}

                    <li className="nav-list__item">
                        <NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normLink}>
                            About
                        </NavLink></li>

                    {/* Auth buttons - показуються тільки якщо користувач НЕ авторизований */}
                    {!user && (
                        <>
                            <li className="nav-list__item">
                                <NavLink to="/auth/login" className="nav-list__link nav-list__link--auth">
                                    Вхід
                                </NavLink>
                            </li>
                            <li className="nav-list__item">
                                <NavLink to="/auth" className="nav-list__link nav-list__link--register">
                                    Реєстрація
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* User info - показується тільки якщо користувач авторизований */}
                    {user && (
                        <li className="nav-list__item nav-list__item--user">
                            <span className="nav-list__user">👤 {user.name || user.email}</span>
                            <button onClick={handleLogout} className="nav-list__logout">
                                Вийти
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;