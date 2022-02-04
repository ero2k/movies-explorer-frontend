import React from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import Preloader from "../Preloader/Preloader";
import {Route, Switch, useHistory} from 'react-router-dom';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import {useState, useEffect} from 'react';
import {register, getEmail} from "../../utils/authApi";
import apiMain from "../../utils/MainApi"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {URL_LOCALDB} from "../../utils/constants";


document.documentElement.lang = 'ru'



function App() {
    const [isCloseMenu, setCloseMenu] = useState(false)
    const [isOpenPreloader, setOpenPreloader] = useState(false)
    const [authSuccess, setAuthSuccess] = useState(false)
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const history = useHistory();

    const closeMenu = () => {
        setCloseMenu(false)
    }
    const openMenu = () => {
        setCloseMenu(true)
    }

    const tokenCheck = () => {
        const jwt = localStorage.getItem('jwt')

        if (!jwt) {
            return false;
        }
        getEmail(jwt)
            .then(data => {
                // setUserInfo(data[0].email);
                console.log(data)
                setCurrentUser({'email': data[0].email, 'name': data[0].name})
                setIsLoggedIn(true);
            })
            .catch(err => console.warn(err));
    };

    useEffect(() => {
        tokenCheck();
    }, [isLoggedIn]);

    const onRegister = (data) => {
        return register(data)
            .then(({token}) => {
                    localStorage.setItem('jwt', token)
                    setAuthSuccess(true)
                    setIsLoggedIn(true)
                }
            )
            .then(() => {
                history.push('/movies');
            }).catch(err => {
                console.log(err)
                if (err.status === 409) {
                    setMessage("Пользователь с таким email уже существует");
                } else {
                    setMessage("При регистрации пользователя произошла ошибка");
                }
            });
    };

    function handleUpdateUser(data) {
        apiMain.saveProfile(data).then((reqdata) => {
            setCurrentUser(reqdata)
        }).catch(err => console.warn(err))
    }

    // fetch(URL_LOCALDB).then(data => console.log(data))


    // const onRegister = async (data) => {
    //     return register(data)
    //         .then(() =>
    //             setAuthSuccess(true)
    //         )
    //         .then(() => setInfoTooltipOpen(true))
    //         .then(() => {
    //             history.push('/signin');
    //         }).catch(err => {
    //             console.warn(err)
    //             setAuthSuccess(false)
    //             setInfoTooltipOpen(true)
    //         });
    // };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header onOpen={openMenu}/>
                <Switch>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                    <Route path="/movies">
                        <Movies/>
                    </Route>
                    <Route path="/saved-movies">
                        <SavedMovies/>
                    </Route>
                    <Route path="/profile" onUpdateUser={handleUpdateUser} >
                        <Profile/>
                    </Route>
                    <Route path="/signup">
                        <Register onRegister={onRegister} message={message}/>
                    </Route>
                    <Route path="/signin">
                        <Login/>
                    </Route>
                    <Route path="/*">
                        <NotFound/>
                    </Route>
                </Switch>
                <Preloader isOpen={isOpenPreloader}/>
                <Menu onClose={closeMenu} isClose={isCloseMenu}/>
                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
