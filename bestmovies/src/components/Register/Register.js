import React from "react";
import "./Register.css"
import logo from "../../images/header/logo.svg";
import {Link} from "react-router-dom";


function Register() {
    return (
        <section className="register">
            <Link to="/" target="_self">
                <img src={logo} alt="Логотип" className="logo"/>
            </Link>
            <h1 className="register__title">Добро пожаловать!</h1>
            <form action="submit" className="register__form">
                <label className="register__label">Имя
                    <input type="text" className="register__input" />
                    <span className="register__error">Что-пошло не так</span>
                </label>
                <label className="register__label">E-mail
                    <input type="email" className="register__input"/>
                    <span className="register__error">Что-пошло не так</span></label>
                <label className="register__label">Пароль
                    <input type="password" className="register__input"/>
                    <span className="register__error register__error-visible">Что-пошло не так</span></label>
                <button type="submit" className="register__btn-submit">Зарегистрироваться</button>
            </form>
            <p className="register__paragraph">Уже зарегистрированы?<Link to="/signin" className="register__btn-login">Войти</Link></p>
        </section>
    )
}

export default Register;
