import React, {useEffect, useState}from "react";
import "./Register.css"
import logo from "../../images/header/logo.svg";
import {Link} from "react-router-dom";


function Register() {
    console.log(useFormWithValidation)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formValid, setFormValid] = useState(false);

    function handleChangeName(e) {
        const validName = /^[a-zA-Z- ]+$/.test(e.target.value);

        if (e.target.value.length < 2) {
            setNameError("Длина имени должна быть не менее 2 символов");
        } else if (e.target.value.length > 30) {
            setNameError("Длина имени должна должна быть не более 30 символов");
        } else if (!validName) {
            setNameError("Имя должно быть указано латиницей");
        } else {
            setNameError("");
        }
        setName(e.target.value);
    }

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
        if (e.target.value.length < 6) {
            setPasswordError("Пароль должен быть не менее 6 символов");
        } else {
            setPasswordError("");
        }
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(name, email, password);
    }

    useEffect(() => {
        if (
            name &&
            email &&
            password &&
            !nameError &&
            !emailError &&
            !passwordError
        ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    }, [name, email, password, nameError, emailError, passwordError]);

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
