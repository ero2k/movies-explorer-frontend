import React, {useContext, useState, useEffect} from "react";
import "./Profile.css"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formValid, setFormValid] = useState(false);
    const [isChangedForm, setIsChangedForm] = useState(false)

    useEffect(() => {
        props.setMessage('')
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            email
        });
        setFormValid(false)
    }

    useEffect(() => {
        if (currentUser.name !== undefined) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser, currentUser.name, currentUser.email]);

    useEffect(() => {
        if (currentUser.name !== name || currentUser.email !== email) {
            setIsChangedForm(true)
        } else {
            setIsChangedForm(false)
        }
    }, [name, email, currentUser.name, currentUser.email])

    useEffect(() => {
        if (!emailError && !nameError && isChangedForm) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [nameError, emailError, isChangedForm])


    function handleNameChange(e) {
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

    function handleEmailChange(e) {
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

    return (
        <>
            <Header onOpen={props.onOpen} isLoggedIn={props.isLoggedIn} page={props.page}/>
            <section className="profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form action="submit" className="profile__form" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="profile__label">Имя<input type="text" id="name"
                                                                               onChange={handleNameChange}
                                                                               className="profile__input" value={name}
                                                                               required/>
                        <span className="profile__span-error profile__span-input">{nameError}</span>
                    </label>
                    <label htmlFor="email" className="profile__label">E-mail<input id="email" type="email"
                                                                                   onChange={handleEmailChange}
                                                                                   className="profile__input"
                                                                                   value={email}
                                                                                   required/>
                        <span className="profile__span-error profile__span-input">{emailError}</span>
                    </label>
                    <button type="submit" className={`profile__btn-submit `}
                            disabled={!formValid && 'disabled'}>Редактировать
                    </button>
                </form>
                <span className="profile__span-error profile__span-response">{props.message}</span>
                <button onClick={props.onLogout} type="button" className="profile__btn-logout">Выйти из аккаунта
                </button>
            </section>
            <Footer/>
        </>
    )
}

export default Profile;
