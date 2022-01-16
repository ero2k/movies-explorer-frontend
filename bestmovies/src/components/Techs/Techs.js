import React from "react";
import "./Techs.css"


function Techs() {
    return (
        <section id="techs" className="techs">
            <div className="techs__section-title max-width">
                <h2 className="techs__title font-size_title">Технологии</h2>
            </div>
            <div className="techs__section-subtitle">
                <h3 className="techs__subtitle font-size_large">7 технологий</h3>
                <p className="techs__paragraph font-size_paragraph">На курсе веб-разработки мы освоили технологии,
                    которые применили в дипломном проекте.</p>
            </div>
            <div className="techs__section-technologies">
                <ul className="techs__section-list">
                    <li className="techs__section-item">
                        HTML
                    </li>
                    <li className="techs__section-item">
                        CSS
                    </li>
                    <li className="techs__section-item">
                        JS
                    </li>
                    <li className="techs__section-item">
                        React
                    </li>
                    <li className="techs__section-item">
                        Git
                    </li>
                    <li className="techs__section-item">
                        Express.js
                    </li>
                    <li className="techs__section-item">
                        mongoDB
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;
