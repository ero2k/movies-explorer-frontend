import React from "react";
import './Header.css';
import {Link} from "react-router-dom";
import logo from "../../images/header/logo.svg";
import Navigation from "../Navigation/Navigation";


function Header(props) {
    const headerClass = props.page === 'main'? '' : 'background-white'

    return (
                <header className={`header ${headerClass}`}>
                    <div className="header__panel">
                    <Link to="/" target="_self">
                        <img src={logo} alt="Логотип" className="logo"/>
                    </Link>
                        {props.isLoggedIn ? <Navigation page={props.page} onOpen={props.onOpen} isLoggedIn={props.isLoggedIn}/> :
                            <span className="auth">
                                <Link to="signup" className="auth__reg">Регистрация</Link>
                               <Link to="signin" className="auth__enter">Войти</Link>
                            </span>
                        }
                    </div>
                </header>
    )

}

export default Header;

//
