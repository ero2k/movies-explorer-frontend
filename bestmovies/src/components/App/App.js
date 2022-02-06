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
import {register, getEmail, authorize} from "../../utils/authApi";
import apiMain from "../../utils/MainApi"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {URL_LOCALDB} from "../../utils/constants";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import apiMovies from "../../utils/MoviesApi";

document.documentElement.lang = 'ru'


function App() {
    const [isCloseMenu, setCloseMenu] = useState(false)
    const [isOpenPreloader, setOpenPreloader] = useState(false)
    const [authSuccess, setAuthSuccess] = useState(false)
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [allMoviesArray, setAllMoviesArray] = useState([])
    const [savedMoviesArray, setSavedMoviesArray] = useState([])
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
                setCurrentUser(data[0])
                setIsLoggedIn(true);
            })
            .catch(err => {
                setIsLoggedIn(false);
                console.warn(err)
            });
    };

    useEffect(() => {
        console.log('!!')
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

    const onLogin = (data) => {
        return authorize(data)
            .then(({token}) => {
                localStorage.setItem('jwt', token);
                setIsLoggedIn(true);
                history.push("/movies");
            }).catch((err) => {
                if (err.status === 401) {
                    return setMessage("Неверный email или пароль");
                }
                setMessage("При авторизации произошла ошибка");

            });
    };

    function handleUpdateUser(data) {
        return apiMain.saveProfile(data, localStorage.getItem('jwt')).then((reqdata) => {
            console.log(reqdata)
            setCurrentUser({name: reqdata.name, email: reqdata.email})
        }).catch(err => {
            if (err.status === 409) {
                setMessage("Пользователь с таким email уже существует");
            } else {
                setMessage("При регистрации пользователя произошла ошибка");
            }
        })
    }

    const onLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        history.push('/signin');
    };

    const getAllMovies = async (e) =>{
            e.preventDefault()
            try {
                const movies = await apiMovies.getInitialCards()
                await localStorage.setItem('movies', JSON.stringify(movies))
                setAllMoviesArray(JSON.parse(localStorage.getItem('movies')))
            } catch (error) {
                console.log(error)
            }
        }

        useEffect(async () => {
            try {
                const savedMovies = await apiMain.getSavedMovies(localStorage.getItem('jwt'))
                await localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
                setSavedMoviesArray(JSON.parse(localStorage.getItem('savedMovies')))
                console.log(savedMovies)
            } catch (error) {
                console.log(error)
            }
        }, [currentUser])

useEffect(() => {
    setAllMoviesArray(localStorage.getItem('movies'))
}, [])
 // console.log(JSON.parse(allMoviesArray))

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>

                    <Route exact path="/">
                        <Header onOpen={openMenu} isLoggedIn={isLoggedIn} page={'main'}/>
                        <Main/>
                        <Footer/>
                    </Route>

                    <ProtectedRoute savedMovies={savedMoviesArray} allMovies={allMoviesArray} submitSearch={getAllMovies} onOpen={openMenu} page={'movies'} isLoggedIn={isLoggedIn}
                                    path="/movies"
                                    component={Movies}>
                    </ProtectedRoute>

                    <ProtectedRoute component={SavedMovies} isLoggedIn={isLoggedIn} path="/saved-movies"
                                    onOpen={openMenu} page={'saved-movies'}>
                    </ProtectedRoute>

                    <ProtectedRoute component={Profile} path="/profile" onOpen={openMenu} isLoggedIn={isLoggedIn}
                                    page={'profile'} onUpdateUser={handleUpdateUser} message={message}
                                    onLogout={onLogout}>
                    </ProtectedRoute>

                    <Route path="/signup">
                        <Register onRegister={onRegister} message={message}/>
                    </Route>

                    <Route path="/signin">
                        <Login onLogin={onLogin} message={message}/>
                    </Route>

                    <Route path="/*">
                        <NotFound/>
                    </Route>

                </Switch>
                <Preloader isOpen={isOpenPreloader}/>
                <Menu onClose={closeMenu} isClose={isCloseMenu}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
