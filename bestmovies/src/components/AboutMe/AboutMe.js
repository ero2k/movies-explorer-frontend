import React from "react";
import {Link} from 'react-router-dom';
import "./AboutMe.css"
import photo from "../../images/main/aboutme/photo.png";


function AboutMe(props) {
    return (
        <section id="about-me" className="aboutme max-width">
            <div className="aboutme__section-title">
                <h2 className="aboutme__title font-size_title">Студент</h2>
            </div>
            <div className="aboutme__section-description">
                <div className="aboutme__student">
                    <p className="aboutme__name font-size_large">Виталий</p>
                    <p className="aboutme__prof">Фронтенд-разработчик, 30 лет</p>
                    <p className="font-size_paragraph  aboutme__description">Я родился и живу в Саратове, закончил
                        факультет экономики СГУ. У
                        меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
                        в
                        компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
                        фриланс-заказами и ушёл с постоянной работы.</p>
                    <div className="aboutme__links">
                        <ul className="aboutme__links-list">
                            <li className="aboutme__item">
                            <Link to="##" className="aboutme__link">Facebook</Link>
                            </li>
                            <li className="aboutme__item">
                            <Link to="##" className="aboutme__link">Github</Link>
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
                        <Link to="##" className="aboutme__portfolio-link">Статичный сайт</Link>
                    </li>
                    <li className="aboutme__portfolio-item">
                        <Link to="##" className="aboutme__portfolio-link">Адаптивный сайт</Link>
                    </li>
                    <li className="aboutme__portfolio-item">
                        <Link to="##" className="aboutme__portfolio-link">Одностраничное приложение</Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default AboutMe;
