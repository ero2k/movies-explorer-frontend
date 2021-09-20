import React from "react";
import "./Footer.css"

function Footer(props) {
    return (
        <footer className="footer">
            <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__section-label">
                <p>&#169; {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;
