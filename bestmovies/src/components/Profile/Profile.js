import React,{useContext, useState,useEffect} from "react";
import "./Profile.css"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'


function Profile(props) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('')
    const [email , setEmail ] = useState('')
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [formValid, setFormValid] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            email
        });
    }

    useEffect(() => {
        if (currentUser.name !== undefined) {
            setName(currentUser.name);
            setEmail(currentUser.email);
        }
    }, [currentUser]);

    function handleNameChange(e) {
        // setChangedName(true);
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
        // setChangedEmail(true);
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
        <section className="profile">
            <h1 className="profile__title">Привет, {name}!</h1>
            <form action="submit" className="profile__form" onSubmit={handleSubmit}>
                <label className="profile__label">Имя<input type="text" onChange={handleNameChange} className="profile__input" value={name} required/></label>
                <label className="profile__label">E-mail<input type="email" onChange={handleEmailChange} className="profile__input" value={email} required/></label>
                <button type="submit" className="profile__btn-submit">Редактировать</button>
            </form>
            <button type="button" className="profile__btn-logout">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;
