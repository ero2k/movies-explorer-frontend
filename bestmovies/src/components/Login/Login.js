import React from "react";
import "./Login.css"
import logo from "../../images/header/logo.svg";
import {Link} from "react-router-dom";


function Login() {
    return (
        <section className="login">
            <img src={logo} alt="Логотип" className="logo"/>
            <h1 className="login__title">Рады видеть!</h1>
            <form action="submit" className="login__form">
                <label className="login__label">E-mail
                    <input type="email" className="login__input" value="test@test.ru"/>
                    <span className="login__error"></span></label>
                <label className="login__label">Пароль
                    <input type="password" className="login__input" value="test@test.ru"/>
                    <span className="login__error"></span></label>
                <button type="submit" className="login__btn-submit">Войти</button>
            </form>
            <p className="login__paragraph">Ещё не зарегистрированы?<Link to="/register" className="login__btn-login">Регистрация</Link></p>
        </section>
    )
}

export default Login;
