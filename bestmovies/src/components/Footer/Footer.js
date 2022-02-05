import React, {useState, useEffect} from "react";
import "./Footer.css"

function Footer() {

    return (
        <footer className='footer max-width'>
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__section-label">
                <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a target="_blank" className="footer__link" rel="noreferrer" href="https://practicum.yandex.ru/">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__item">
                        <a target="_blank" className="footer__link" rel="noreferrer" href="https://github.com/ero2k">
                            Github
                        </a>
                    </li>
                    <li className="footer__item">
                        <a target="_blank"  rel="noreferrer" className="footer__link" href="https://vk.com/ero2k">
                            VK
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
