import {useEffect, useState} from "react"
import { formatDate } from "../helpers/formatDate";
import './style.css'


const Dates = () => {
    const [now, setNow] = useState(new Date())

    useEffect(()=>{
        const interval = setInterval(() => {
          setNow(new Date())
        }, 1000);
        return ()=>{clearInterval(interval)}
    },[])

    return (
        < >
        <div className="date">
            <p>{formatDate(new Date())}</p>
            <span>{now.toLocaleTimeString()}</span>
        </div>
        </>
    )

}
export default Dates;

