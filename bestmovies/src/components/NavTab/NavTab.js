import React from "react";
import {Link} from 'react-router-dom';
import "./NavTab.css"

function NavTab(props) {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li className="nav__item">
                    <Link to="##" className="nav__link">
                        О проекте
                    </Link>
                </li>
                <li  className="nav__item">
                    <Link to="##" className="nav__link">
                        Технологии
                    </Link>
                </li>
                <li  className="nav__item">
                    <Link to="##" className="nav__link">
                        Студент
                    </Link>
                </li>
            </ul>
        </nav>

    )
}

export default NavTab;
