import React from "react";
import {Link} from 'react-router-dom';
import "./Footer.css"

function Footer() {
    const currentPathname = document.location.pathname
    const footerPath = ['/movies', '/favorite-movies', '/'] //'/profile', '/register', '/login'
    const footerClass =  footerPath.indexOf(currentPathname) >= 0 ? "footer max-width" : "footer hidden"

    return (
        <footer className={footerClass}>
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__section-label">
                <p className="footer__copyright">&#169; {new Date().getFullYear()}</p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a target="_blank" className="footer__link" href="https://practicum.yandex.ru/">
                            Яндекс.Практикум
                        </a>
                    </li>
                    <li className="footer__item">
                        <a target="_blank" className="footer__link" href="https://github.com/ero2k">
                            Github
                        </a>
                    </li>
                    <li className="footer__item">
                        <a target="_blank" className="footer__link" href="https://vk.com/ero2k">
                            VK
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
