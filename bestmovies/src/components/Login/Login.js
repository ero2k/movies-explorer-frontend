import React from "react";
import "./Login.css"
import logo from "../../images/header/logo.svg";
import {Link} from "react-router-dom";


function Login() {
    return (
        <section className="login">
            <Link to="/" target="_self">
                <img src={logo} alt="Логотип" className="logo"/>
            </Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form action="submit" className="login__form">
                <label className="login__label">E-mail
                    <input type="email" className="login__input"/>
                    <span className="login__error"></span></label>
                <label className="login__label">Пароль
                    <input type="password" className="login__input" />
                    <span className="login__error login__error-visible">Что то пошло не так</span></label>
                <button type="submit" className="login__btn-submit">Войти</button>
            </form>
            <p className="login__paragraph">Ещё не зарегистрированы?<Link to="/signup" className="login__btn-login">Регистрация</Link></p>
        </section>
    )
}

export default Login;
