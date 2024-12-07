import Maps from "../components/maps/Maps";

const Contacts = () => {
    return (
        <main className="section">
            <div className="container">
                <h1 className="title-1">Contacts</h1>
                <ul className="content-list">
                    <li className="content-list__item">
                        <h2 className="title-2">Графік роботи:</h2>
                        <p><b>Понеділок - П'ятниця</b> <br/>09:00-20:00 <br/> <b>Cуббота</b> <br/>09:00-14:00 </p>
                        <p></p>
                        <h2 className="title-2">Telegram</h2>
                        <p><a href="tel:+38(096)173-75-28">+38(096)173-75-28</a></p>
                    </li>
                    {/* <li className="content-list__item">
                        <h2 className="title-2">Email</h2>
                        <p><a href="mailto:Dzhekanator1993@gmail.com">Dzhekanator1993@gmail.com</a></p>
                    </li> */}
                    <li className="content-list__item">
                        <h2 className="title-2">Location</h2>
                        <p>Ukrain, Kriviy Rig city, Uhtomskogo street, 26a</p>
                    </li>
                </ul>
                <div className="location">
                    <Maps />
                </div>
            </div>
        </main>
    );
}

export default Contacts;