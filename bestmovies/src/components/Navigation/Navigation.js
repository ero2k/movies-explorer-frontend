import React from "react";
import './Navigation.css';
import {Link, NavLink} from "react-router-dom";
import burger from "../../images/main/menu/icon-burger.png";


function Navigation(props) {
    const linkClass = props.page === 'main' ? 'header__movie-link-white' : ''

    return (
        <>
            <nav className="header__section-movie">
                <ul className="header__links">
                    <li className="header__link">
                        <NavLink className={`header__movie-link ${linkClass}`} activeClassName="header__link-active" exact
                                 to="movies">Фильмы</NavLink>
                    </li>
                    <li className="header__link">
                        <NavLink className={`header__movie-link ${linkClass}`} activeClassName="header__link-active"
                                 to="saved-movies">Сохранённые фильмы</NavLink>
                    </li>
                </ul>
            </nav>
            <div className="auth">
                <Link to="profile" className={`${props.isLoggedIn && linkClass} header__acc `}>Аккаунт
                    <div className="account-logo"></div>
                </Link>
                <button className="auth__button-burger" onClick={props.onOpen}>
                    <img src={burger} className="menu-burger" alt="Открыть меню"/>
                </button>
            </div>
        </>
    )
}

export default Navigation
