import "./style.css";
import React from "react";

import ServicesImg from "./services.jpeg";

import Clock from "./clock.svg";
import Dumbbell from "./dumbbell.svg";
import Medal from "./medal.svg";

const Services = () => {
    return (
        <div className="services">

            <div className="services_boxImg">
                <img className="services_img" src={ServicesImg} alt="" />
            </div>
            <div className="services_text">
                <h2 className="title-1 black_title">Services</h2>
                <div className="services_box">
                    <img className="services_logo" src={Clock} alt="" />
                    <div className="logo-svg">
                    </div>
                    <span>
                        <h3 className="title-2">Workout shedule</h3>
                        <p>Розклад тренувань формується індивідуально для кожного класу та залежить від обраного формату занять.
                            Час проведення тренувань обговорюється заздалегідь, щоб максимально підлаштуватися під ваші потреби.</p>
                    </span>
                </div>
                <div className="services_box">
                    <img className="services_logo" src={Dumbbell} alt="" />
                    <div className="logo-svg">
                    </div>
                    <span>
                        <h3 className="title-2">Exercise cicle</h3>
                        <p>Цикл вправ складається з ретельно підібраних рухів, спрямованих на всебічний розвиток сили, витривалості та координації.
                            Кожна вправа виконується з акцентом на правильну техніку, поступово збільшуючи інтенсивність для максимального прогресу.</p>
                    </span>
                </div>
                <div className="services_box">
                    <img className="services_logo" src={Medal} alt="" />
                    <div className="logo-svg">
                    </div>
                    <span>
                        <h3 className="title-2">Expert trainer</h3>
                        <p>Професіонал з багаторічним досвідом у сфері фітнесу та атлетизму, який знає, як мотивувати та налаштовувати на результат.
                            Завдяки індивідуальному підходу та глибокому розумінню фізіології, допоможу вам досягти максимальних результатів, незалежно від вашого рівня підготовки.</p>
                    </span>
                </div>
            </div>
        </div>

    )
};

export default Services;
