import Classes from "../components/classCard/Classes.js";
import Header from "../components/header/Header.jsx";
import Info from "../components/info/Info.js";
import Service from "../components/service/Service.js";
import Services from "../components/services/Services.jsx";


const Home = () => {
    return (<>
        <Header />

        <main className="section">
            <div className="container">
                <Info/>
                <Services/>
                <Classes/>
                <Service/>
            </div>
        </main>
    </>);
}

export default Home;