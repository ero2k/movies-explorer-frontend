import React from "react";
import './Header.css'
import logo from "../../images/header/logo.svg";

function Header(props) {


    return (
<header className="header">
    <a href="##" target="_self">
        <img src={logo} alt="Логотип" className="logo"/>
    </a>
    <span className="auth">
        <a href="##" className="auth__reg">Регистрация</a>
        <a href="##" className="auth__enter">Войти</a>
    </span>
</header>
    )
}

export default Header;
