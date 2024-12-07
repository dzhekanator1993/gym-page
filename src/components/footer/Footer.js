import './style.css'

import inst from "../../img/icons/inst.png";
import telegram from "../../img/icons/telegram.png";
import phone from "../../img/icons/phone.png";
import email from "../../img/icons/email.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer_wraper">
                    <ul className="social">
                        <li className="social_item"><a href="https://www.instagram.com/terny_gym"><img src={inst} alt="link" /></a></li>
                        <li className="social_item"><a href="https://t.me/+380961737528"><img src={telegram} alt="link" /></a></li>
                        <li className="social_item"><a href="tel:+380961737528"><img src={phone} alt="link" /></a></li>
                        <li className="social_item"><a href="mailto:dzhekanator1993@gmail.com"><img src={email} alt="link" /></a></li>
                    </ul>
                    <div className="copiright"></div>
                    <p>© 2024 Jonni dev</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;