import React from "react";
import "./NotFound.css"
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <div className="not-found">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__paragraph">Страница не найдена</p>
            <Link className="not-found__link">Назад</Link>
        </div>
    )
}

export default NotFound;
