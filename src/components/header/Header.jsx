import './style.css';
import Modal from "./../modal/Modal"
import ContactForm from "./../contactForm/ContactForm"
import { useState } from 'react';


const Header = () => {
    const [modalInfoIsOpen, setModalInfoIsOpen] = useState(false)
    return (
        <header className="header">
            <div className="header__wrapper">
                <h1 className="header__title">
                    <strong><em>You're stronger than you think!!!</em></strong><br />
                    every step brings you closer to your goal
                </h1>
                <div className="header__text">
                    <p> Не дозволяйте сумнівам стати на заваді — <br />
                        справжня сила полягає не тільки в м’язах, а в рішучості рухатися вперед, адже кожна крапля поту будує сильніше майбутнє; цей шлях непростий, але вартий кожного зусилля, тому продовжуйте йти до своєї мрії.</p>
                </div>
                {/* <a href="#!" ></a> */}
                <button className="btn" onClick={() => setModalInfoIsOpen(true)}>Contact</button>
                <Modal isOpen={modalInfoIsOpen}
                    onClose={() => setModalInfoIsOpen(false)} >
                    <ContactForm />
                </Modal>
            </div>
        </header>
    );
}

export default Header;