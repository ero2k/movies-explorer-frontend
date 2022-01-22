import React from "react";
import "./NotFound.css"
import {Link,useHistory} from "react-router-dom";

function NotFound() {
    const history = useHistory();

    return (
        <div className="not-found">
            <h2 className="not-found__title">404</h2>
            <p className="not-found__paragraph">Страница не найдена</p>
            <Link className="not-found__link" onClick={() => history.goBack()}>Назад</Link>
        </div>
    )
}

export default NotFound;
