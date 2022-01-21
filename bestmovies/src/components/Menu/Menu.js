import React from "react";
import './Menu.css';
import {NavLink} from "react-router-dom";
import closeIcon from "../../images/main/menu/icon-close.png"

function Menu(props) {
    const menuStyle = !props.isClose ? "menu" : "menu menu-open"
    console.log(props.isClose)

    return (
        <div className={menuStyle} >/
            <button type="button" className="menu__button-close" onClick={props.onClose}>
                <img src={closeIcon} className="menu__close-image" alt="Закрыть"/>
            </button>
            <nav className="menu__navigation">
                <ul className="menu__links">
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/">Главная</NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/movies">Фильмы</NavLink>
                    </li>
                    <li className="menu__item">
                        <NavLink className="menu__link" activeClassName="menu__link_active" exact to="/saved-movies">Сохранённые фильмы</NavLink>
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
