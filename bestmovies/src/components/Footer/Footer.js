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
                        <Link className="footer__link" to="##">
                            Яндекс.Практикум
                        </Link>
                    </li>
                    <li className="footer__item">
                        <Link className="footer__link" to="##">
                            Github
                        </Link>
                    </li>
                    <li className="footer__item">
                        <Link className="footer__link" to="##">
                            Facebook
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
