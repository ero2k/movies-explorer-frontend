import React, {useEffect, useState} from "react";
import "./Login.css"
import logo from "../../images/header/logo.svg";
import {Link} from "react-router-dom";


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formValid, setFormValid] = useState(false);

    function handleChangeEmail(e) {
        const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
            e.target.value
        );

        if (!validEmail) {
            setEmailError("Неверный формат почты");
        } else {
            setEmailError("");
        }
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        if (e.target.value.length < 8) {
            setPasswordError("Пароль должен быть не менее 8 символов");
        } else {
            setPasswordError("");
        }
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin({email, password});
    }

    useEffect(() => {
        if (
            !emailError &&
            !passwordError
        ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [emailError, passwordError]);

    return (
        <section className="login">
            <Link to="/" target="_self">
                <img src={logo} alt="Логотип" className="logo"/>
            </Link>
            <h1 className="login__title">Рады видеть!</h1>
            <form action="submit" className="login__form" onSubmit={handleSubmit}>
                <label className="login__label">E-mail
                    <input onChange={handleChangeEmail} value={email} type="email" className="login__input"/>
                    <span className="login__error login__error-visible">{emailError}</span></label>
                <label className="login__label">Пароль
                    <input onChange={handleChangePassword} value={password} type="password" className="login__input" />
                    <span className="login__error login__error-visible">{passwordError}</span></label>
                <span className={`register__error register__error-response ${!!props.message && 'register__error-visible'}`}>{props.message}</span>
                <button type="submit" className={`login__btn-submit ${!formValid && 'login__btn-disabled'}`} disabled={!formValid}>Войти</button>
            </form>
            <p className="login__paragraph">Ещё не зарегистрированы?<Link to="/signup" className="login__btn-login">Регистрация</Link></p>
        </section>
    )
}

export default Login;
