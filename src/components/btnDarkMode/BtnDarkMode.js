import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { useLocalStorage } from '../../utils/useLocalStorage';
import detectDarkMode from '../../utils/detectDarkMode';

import './style.css';
import sun from "./Sun.svg";
import moon from "./Moon.svg";

const BtnDarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [darkMode, setDarkMode] = useLocalStorage('darkMode', detectDarkMode());

    // Sync Chakra UI color mode with local storage
    useEffect(() => {
        if (darkMode === 'dark' && colorMode === 'light') {
            toggleColorMode();
        } else if (darkMode === 'light' && colorMode === 'dark') {
            toggleColorMode();
        }
    }, [darkMode, colorMode, toggleColorMode]);

    // Add dark class to body for legacy CSS
    useEffect(() => {
        if (colorMode === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [colorMode]);

    // Listen to system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event) => {
            const newColorScheme = event.matches ? 'dark' : 'light';
            setDarkMode(newColorScheme);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [setDarkMode]);

    const handleToggle = () => {
        const newMode = colorMode === 'light' ? 'dark' : 'light';
        setDarkMode(newMode);
        toggleColorMode();
    };

    const btnNormal = "dark-mode-btn";
    const btnActive = "dark-mode-btn dark-mode-btn--active";

    return (
        <button className={colorMode === 'dark' ? btnActive : btnNormal} onClick={handleToggle}>
            <img src={sun} alt="dark mode" className="dark-mode-btn__icon" />
            <img src={moon} alt="light mode" className="dark-mode-btn__icon" />
        </button>
    );
}

export default BtnDarkMode;