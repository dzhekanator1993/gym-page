import { useState } from "react";
// import { formatDate } from "../helpers/formatDate";
import './style.css'


const Dates = () => {
    const [now, setNow] = useState(new Date())
    
    setInterval(() => {
        setNow(new Date())
    }, 1000);

    // Запрашиваем день недели вместе с длинным форматом даты
    var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    
    // options.timeZone = "UTC";
    // options.timeZoneName = "short";
    return (
        <>
            <span className="date">{now.toLocaleString("uk-UK", options)} </span>
        </>
        // <main className="section">

        //     <h2 className="title-2">News</h2>
        //     <p>{formatDate(new Date())}</p>
        // </main>
    )

}
export default Dates;

