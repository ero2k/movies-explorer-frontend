import React from "react";
import './Header.css';
import {Link, Route, Switch, NavLink} from "react-router-dom";
import logo from "../../images/header/logo.svg";
import burger from "../../images/main/menu/icon-burger.png";

function Header(props) {
    const currentPathname = document.location.pathname
    const headerWhitePath = ['/movies', '/favorite-movies', '/profile']
    const headerClass = headerWhitePath.indexOf(currentPathname) >= 0 ? "header background-white" : "header hidden"

    console.log(document.location.pathname)

    console.log(headerWhitePath.indexOf(currentPathname) >= 0)

    return (
        <Switch>
            <Route exact path='/'>
                <header className="header">
                    <Link to="/" target="_self">
                        <img src={logo} alt="Логотип" className="logo"/>
                    </Link>
                    <span className="auth">
                        <Link to="/register" className="auth__reg">Регистрация</Link>
                        <Link to="##" className="auth__enter">Войти</Link>
                    </span>
                </header>
            </Route>

            <Route path='/*'>
                <header className={headerClass}>
                    <Link to="/movies" target="_self">
                        <img src={logo} alt="Логотип" className="logo"/>
                    </Link>
                    <nav className="header__section-movie">
                        <ul className="header__links">
                            <li className="header__link">
                                <NavLink className="header__movie-link" activeClassName="header__link_active" exact
                                         to="movies">Фильмы</NavLink>
                            </li>
                            <li className="header__link">
                                <NavLink className="header__movie-link" activeClassName="header__link_active"
                                         to="favorite-movies">Сохранённые фильмы</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="auth">
                        <Link to="##" className="header__acc">Аккаунт
                            <div className="header__logo"></div>
                        </Link>
                        <img src={burger} className="header__menu-burger" alt=""/>
                        {/*<div className="header__menu-burger">*/}
                        {/*    <span></span>*/}
                        {/*</div>*/}
                    </div>
                </header>
            </Route>
        </Switch>
    )
}

export default Header;
