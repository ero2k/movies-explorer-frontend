import React from "react";
import "./Profile.css"


function Profile() {
    return (
        <section className="profile">
            <h1 className="profile__title">Привет, Виталий!</h1>
            <form action="submit" className="profile__form">
                <label className="profile__label">Имя<input type="text" className="profile__input" value="Виталий"/></label>
                <label className="profile__label">E-mail<input type="email" className="profile__input" value="test@test.ru"/></label>
                <button type="submit" className="profile__btn-submit">Редактировать</button>
            </form>
            <button type="button" className="profile__btn-logout">Выйти из аккаунта</button>
        </section>
    )
}

export default Profile;
