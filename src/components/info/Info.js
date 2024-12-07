import React from "react";
import img from "./about.JPG";
import "./style.css";

const Info = () => {
    return (
        <div className="info">
            <div className="info_text">
                <p>Радий вітати тебе в нашій спільноті послідовників шляху фітнесу.</p>
                    <p>Людей, які приходять за справжніми результатами, які прагнуть не тільки змінити себе до невпізнання, стати сильнішими, здоровішими, красивішими, а найголовніше — щасливішими, але й тягнуться до знань і досвіду.</p>
                    <p>Секта людей, які не приймають звичайний підхід у фітнесі і, як наслідок, звичайні результати (часто — ніяких результатів), але хочуть отримати від фітнес-культури найкраще.
                </p>
                <h1 className="info_title"> <span>TernyGYM</span> </h1>
                {/* <button className="info_btn">Show more</button> */}
            </div>
            <div className="info_image">
                <img src={img} alt="about" />
            </div>
        </div>
    )
};

export default Info;
