import React from "react";
import './Header.css';
import {Link, Route, Switch, NavLink} from "react-router-dom";
import logo from "../../images/header/logo.svg";
import burger from "../../images/main/menu/icon-burger.png";

function Header(props) {
    const currentPathname = document.location.pathname
    const headerWhitePath = ['/movies', '/saved-movies', '/profile']
    const headerClass = headerWhitePath.indexOf(currentPathname) >= 0 ? "header background-white" : "header hidden"

    return (
        <Switch>
            <Route exact path='/'>
                <header className="header">
                    <div className="header__panel">
                    <Link to="/" target="_self">
                        <img src={logo} alt="Логотип" className="logo"/>
                    </Link>
                    <span className="auth">
                        <Link to="signup" className="auth__reg">Регистрация</Link>
                        <Link to="signin" className="auth__enter">Войти</Link>
                    </span>
                    </div>
                </header>
            </Route>

            <Route path='/*'>
                <header className={headerClass}>
                    <div className="header__panel">
                    <Link to="/" target="_self">
                        <img src={logo} alt="Логотип" className="logo"/>
                    </Link>
                    <nav className="header__section-movie">
                        <ul className="header__links">
                            <li className="header__link">
                                <NavLink className="header__movie-link" activeClassName="header__link-active" exact
                                         to="movies">Фильмы</NavLink>
                            </li>
                            <li className="header__link">
                                <NavLink className="header__movie-link" activeClassName="header__link-active"
                                         to="saved-movies">Сохранённые фильмы</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="auth">
                        <Link to="profile" className="header__acc">Аккаунт
                            <div className="account-logo"></div>
                        </Link>
                        <button className="auth__button-burger" onClick={props.onOpen}>
                            <img src={burger} className="menu-burger" alt="Открыть меню"/>
                        </button>
                    </div>
                    </div>
                </header>
            </Route>
        </Switch>
    )
}

export default Header;
