import React from "react";
import './Header.css';
import {Link, Route, Switch, NavLink} from "react-router-dom";
import logo from "../../images/header/logo.svg";

function Header(props) {
    const currentPathname = document.location.pathname
    const headerWhitePath = ['/movies' , '/favorite-movies', '/profile']
    const headerClass =  headerWhitePath.indexOf(currentPathname) >= 0 ? "header background-white" : "header hidden"

    console.log( document.location.pathname)

    console.log( headerWhitePath.indexOf(currentPathname) >= 0)

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
                <header className={headerClass }>
                    <Link to="/movies" target="_self">
                        <img src={logo} alt="Логотип" className="logo"/>
                    </Link>
                    <nav className="header__section-movie">
                        <NavLink className="header__movie-link" activeClassName="header__link_active" exact to="movies">Фильмы</NavLink>
                        <NavLink className="header__movie-link" activeClassName="header__link_active" to="favorite-movies">Сохранённые фильмы</NavLink>
                    </nav>
                    <div className="auth">
                        <Link to="##" className="header__acc">Аккаунт<div className="header__logo"></div></Link>
                    </div>
                </header>
            </Route>
        </Switch>
    )
}

export default Header;
