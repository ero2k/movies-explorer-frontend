import React from "react";
import './Menu.css';
import {Link, Route, Switch, NavLink} from "react-router-dom";
import logo from "../../images/header/logo.svg";

function Menu(props) {

    return (
        <div className="menu">
            <nav className="menu__navigation">
                <ul className="menu__links">
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/">Главная</NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/movies">Фильмы</NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/favorite-movies">Сохранённые фильмы</NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/profile">Аккаунт<div className="header__logo"></div></NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu;
