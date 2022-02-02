import React from "react";
import "./AboutProject.css"


function AboutProject() {
    return (
        <section id="about-project" className="about max-width">
            <div className="about__section-title">
                <h2 className="about__title fontsize-title">О проекте</h2>
            </div>
            <ul className="about__list">
                <li className="about__item">
                    <h3 className="about__subtitle fontsize-subtitle">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about__paragraph fontsize-paragraph">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
                        доработки.
                    </p>
                </li>
                <li className="about__item">
                    <h3 className="about__subtitle fontsize-subtitle">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about__paragraph fontsize-paragraph">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
                        защититься.
                    </p>
                </li>
            </ul>
            <ul className="about__progress">
                <li className="about__progress-item">
                    <h3 className="about__progress-period">
                        1 неделя
                    </h3>
                    <p className="about__progress-label">
                        Back-end
                    </p>
                </li>
                <li className="about__progress-item">
                    <h3 className="about__progress-period">
                        4 недели
                    </h3>
                    <p className="about__progress-label">
                        Front-end
                    </p>
                </li>
            </ul>
        </section>
    )
}

export default AboutProject;
