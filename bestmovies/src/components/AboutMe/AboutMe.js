import React from "react";
import {Link} from 'react-router-dom';
import "./AboutMe.css"
import photo from "../../images/main/aboutme/photo.jpg";


function AboutMe(props) {
    return (
        <section id="about-me" className="aboutme max-width">
            <div className="aboutme__section-title">
                <h2 className="aboutme__title font-size_title">Студент</h2>
            </div>
            <div className="aboutme__section-description">
                <div className="aboutme__student">
                    <p className="aboutme__name font-size_large">Денис</p>
                    <p className="aboutme__prof">Фронтенд-разработчик, 32 лет</p>
                    <p className="font-size_paragraph  aboutme__description">Я родился в Улан-Удэ, живу в Новосибирске.
                  Я люблю слушать музыку и увлекаюсь программированием.</p>
                    <div className="aboutme__links">
                        <ul className="aboutme__links-list">
                            <li className="aboutme__item">
                                <a target="_blank" href="https://vk.com/ero2k" className="aboutme__link">VK</a>
                            </li>
                            <li className="aboutme__item">
                                <a target="_blank" href="https://github.com/ero2k" className="aboutme__link">Github</a>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="aboutme__section-photo">
                    <img className="aboutme__photo" src={photo} alt="Фото студента"/>
                </div>
            </div>
            <div className="aboutme__portfolio">
                <p className="aboutme__portfolio-title">Портфолио</p>
                <ul className="aboutme__portfolio-list">
                    <li className="aboutme__portfolio-item">
                        <a target="_blank" href="https://ero2k.github.io/how-to-learn/"
                           className="aboutme__portfolio-link">Статичный сайт</a>
                    </li>
                    <li className="aboutme__portfolio-item">
                        <a target="_blank" href="https://ero2k.github.io/russian-travel/"
                           className="aboutme__portfolio-link">Адаптивный сайт</a>
                    </li>
                    <li className="aboutme__portfolio-item">
                        <a target="_blank" href="https://ero2k.github.io/mesto/" className="aboutme__portfolio-link">Одностраничное
                            приложение</a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default AboutMe;
