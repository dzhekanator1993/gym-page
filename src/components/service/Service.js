import React from "react";
import "./style.css";
import headphones from "./headphones-black.svg";
import star from "./star-black.svg";
import thumbs from "./thumbs-up-black.svg";
import trophy from "./trophy-black.svg";


const Service = () => {
    return (
        <div className="service">
            <div className="service_card">
                <img className="service_ico" src={headphones} alt="headphones"></img>
                <h2 className="service_title">Free consultation</h2>
                <p className="service_text">Це чудова можливість оцінити ваші поточні фізичні можливості, обговорити цілі та скласти попередній план дій. Записуйтеся на консультацію прямо зараз, і ми разом знайдемо найкращий шлях до вашого успіху!
                </p>
            </div>
            <div className="service_card">
                <img className="service_ico" src={star} alt="star"></img>
                <h2 className="service_title">Exellent service</h2>
                <p className="service_text">Завдяки досвіду тренерської роботи, ми знаємо, як забезпечити індивідуальний підхід до кожного клієнта, враховуючи ваші цілі, рівень підготовки та спосіб життя. Давайте разом досягнемо найкращих результатів!</p>
            </div>
            <div className="service_card">
                <img className="service_ico" src={thumbs} alt="thumbs"></img>
                <h2 className="service_title">Best treiner</h2>
                <p className="service_text">Наша мета — допомогти вам не лише досягти ваших фітнес-цілей, а й отримати задоволення від процесу. Готові до змін? Давайте почнемо ваш шлях до кращої версії себе!</p>
            </div>
            <div className="service_card">
                <img className="service_ico"src={trophy} alt="trophy"></img>
                <h2 className="service_title">Work programs</h2>
                <p className="service_text">Незалежно від того, чи хочете ви покращити фізичну форму, скинути вагу або збільшити м'язову масу - кожна програма спрямована на баланс між ефективністю та безпекою, а також допоможе вам отримати максимум результатів за мінімальний час.</p>
            </div>
        </div>
    )
};

export default Service;
