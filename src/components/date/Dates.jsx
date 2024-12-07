import { formatDate } from "../helpers/formatDate";
import './style.css'

const Dates = () => {
    return (
        <main className="section">

                    <h2 className="title-2">News</h2>
                    <p>{formatDate(new Date())}</p>

        </main>
    )

}
export default Dates;

