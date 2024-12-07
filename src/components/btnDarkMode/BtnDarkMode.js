import { useEffect } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';
import detectDarkMode from '../../utils/detectDarkMode';

import './style.css';
import sun from "./Sun.svg";
import moon from "./Moon.svg";

const BtnDarkMode = () => {

    const [darkMode, setDarkMode] = useLocalStorage('darkMode', detectDarkMode());

    useEffect(() => {
        if (darkMode === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            const newColorScheme = event.matches ? 'dark' : 'light';
            setDarkMode(newColorScheme)
        })
    }, [setDarkMode])

    const toggleDarkMode = () => {
        setDarkMode((currentValue) => {
            return currentValue === 'light' ? 'dark' : 'light';
        })

    }

    const btnNormal = "dark-mode-btn";
    const btnActive = "dark-mode-btn dark-mode-btn--active";

    return (
        <button className={darkMode === 'dark' ? btnActive : btnNormal} onClick={toggleDarkMode}>
            <img src={sun} alt="dark mode" className="dark-mode-btn__icon" />
            <img src={moon} alt="light mode" className="dark-mode-btn__icon" />
        </button>
    );
}

export default BtnDarkMode;