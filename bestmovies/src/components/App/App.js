import React from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import {Route, Switch, Redirect, useHistory, useLocation} from 'react-router-dom';
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import apiMovies from "../../utils/MoviesApi";
import {DURATION_SHORT_MOVIE} from "../../utils/constants";

document.documentElement.lang = 'ru'


function App() {
    const [isCloseMenu, setCloseMenu] = useState(false)
    const [isOpenPreloader, setOpenPreloader] = useState(false)
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const [allMoviesArray, setAllMoviesArray] = useState([])
    const [savedMoviesArray, setSavedMoviesArray] = useState([])

    const [allMoviesFiltered, setAllMoviesFiltered] = useState([])
    const [savedMoviesFiltered, setSavedMoviesFiltered] = useState([])

    const [lastState, setLastState] = useState({})

    const [isShortMovie, setIsShortMovie] = useState(false)
    const [searchPhrase, setSearchPhrase] = useState('')

    const pathRequestSource = useLocation()

    const history = useHistory();

    const closeMenu = () => {
        setCloseMenu(false)
    }
    const openMenu = () => {
        setCloseMenu(true)
    }


    const tokenCheck = (path) => {
        const jwt = localStorage.getItem('jwt')

        if (!jwt) {
            return false;
        }

        getEmail(jwt)
            .then(data => {
                setCurrentUser(data[0])
                setIsLoggedIn(true);
                history.push(path)
            })
            .catch(err => {
                setIsLoggedIn(false);
                console.warn(err)
            });
    };


    useEffect(() => {
        tokenCheck(pathRequestSource);
        // eslint-disable-next-line
    }, []);


    const onRegister = (data) => {
        setMessage('')

        return register(data)
            .then(({token}) => {
                    localStorage.setItem('jwt', token)
                    setIsLoggedIn(true)
                }
            ).then(() => {
                    tokenCheck('/movies')
                }
            )
            .catch(err => {
                console.log(err)
                if (err.status === 409) {
                    setMessage("Пользователь с таким email уже существует");
                } else {
                    setMessage("При регистрации пользователя произошла ошибка");
                }
            });
    };

    const onLogin = (data) => {
        setMessage('')

        return authorize(data)
            .then(({token}) => {
                localStorage.setItem('jwt', token);
                setIsLoggedIn(true);
                tokenCheck("/movies")
            }).catch((err) => {
                if (err.status === 401) {
                    return setMessage("Неверный email или пароль");
                }
                setMessage("При авторизации произошла ошибка");
            });
    };

    function handleUpdateUser(data) {
        setMessage('')

        return apiMain.saveProfile(data, localStorage.getItem('jwt')).then((reqdata) => {
            setCurrentUser(reqdata)
            setMessage("Данные успешно сохранены");
        })
            .then((data) => {
                setMessage("Данные успешно сохранены");
            })
            .catch(err => {
                if (err.status === 409) {
                    setMessage("Пользователь с таким email уже существует");
                } else {
                    setMessage("При регистрации пользователя произошла ошибка");
                }
            })
    }

    const onLogout = () => {
        setIsLoggedIn(false);
        setSavedMoviesFiltered([])
        setAllMoviesFiltered([])
        setSavedMoviesArray([])
        setAllMoviesArray([])
        setSearchPhrase('')
        setCurrentUser({})
        setLastState({})
        localStorage.removeItem('jwt');
        localStorage.removeItem('allMovies');
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('countShow')
        localStorage.removeItem('lastStateMovies')
        setMessage('')
        history.push('/');
    };

    function handleShortMovie(value) {
        setIsShortMovie(value)
    }

    const filteredMovies = (moviesForFiltered, phrase, isShort) => {
        const filterByPhrase = moviesForFiltered.filter(movie => movie.nameRU.toLowerCase().trim().includes(phrase.toLowerCase().trim()))
        if (!isShort) {
            return filterByPhrase
        }

        return filterByPhrase.filter(movie => movie.duration <= DURATION_SHORT_MOVIE)
    }

    const getAllMovies = async () => {
        setMessage('')

        try {
            setOpenPreloader(true)
            const movies = await apiMovies.getInitialCards()
            await localStorage.setItem('allMovies', JSON.stringify(movies))
            setAllMoviesArray(movies)
            setOpenPreloader(false)

            return movies
        } catch (error) {
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            console.log(error)
        }
    }

    const getSavedMovies = async () => {
        try {
            localStorage.removeItem('savedMovies')

            const savedMovies = await apiMain.getSavedMovies(localStorage.getItem('jwt'))
            setSavedMoviesArray(savedMovies)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!!currentUser.email) {
            try {
                getSavedMovies()
            } catch (error) {
                console.log(error)
            }
        }

    }, [currentUser])

    const likeMovie = async (movieData) => {
        try {
            const likedMovie = await apiMain.likedMovie({...movieData}, localStorage.getItem('jwt'))
            setSavedMoviesArray([...savedMoviesArray, likedMovie])
            setSavedMoviesFiltered([...savedMoviesArray, likedMovie])

        } catch (error) {
            console.log(error)
        }
    }

    const deleteMovieFromSave = async (idCard) => {
        try {
            const info = await apiMain.deleteMovie(idCard, localStorage.getItem('jwt'))
            const newSavedArrayMovies = savedMoviesArray.filter(movie => {
                if (idCard !== movie._id) {
                    return movie
                }
            })

            const newSavedArrayFiltered = savedMoviesFiltered.filter(movie => {
                if (idCard !== movie._id) {
                    return movie
                }
            })

            setSavedMoviesFiltered(newSavedArrayFiltered)
            setSavedMoviesArray(newSavedArrayMovies)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitSearchForm = async (phrase) => {
        if (allMoviesArray.length === 0) {
            await getAllMovies()
        }

        setSearchPhrase(phrase)
    }

    useEffect(() => {
        const filteredByPhrase = filteredMovies(allMoviesArray, searchPhrase, isShortMovie)
        setAllMoviesFiltered(filteredByPhrase)
    }, [allMoviesArray, searchPhrase, isShortMovie])


    const handleSearchFormSavedMovie = async (phrase, isChecked) => {
        const filtered = filteredMovies(savedMoviesArray, phrase, isChecked)
        setSavedMoviesFiltered(filtered)
    }

    // useEffect(() => {
    //     setSavedMoviesFiltered(savedMoviesArray)
    // }, [savedMoviesArray])


    useEffect(() => {
        const lastStateMovies = {
            'phrase': searchPhrase,
            'checkbox': isShortMovie,
            'movies': allMoviesFiltered
        }
        if (allMoviesArray.length !== 0) {
            localStorage.setItem('lastStateMovies', JSON.stringify(lastStateMovies))
            setLastState(lastStateMovies)
        }
    }, [allMoviesFiltered])

    useEffect(() => {
        if (isLoggedIn) {
            getSavedMovies()
        }
    }, [isLoggedIn])


    useEffect(() => {
        setMessage('')
        if (!lastState.movies) {
            try {
                // getSavedMovies()

                if (!!localStorage.getItem('allMovies')) {
                    setAllMoviesArray(JSON.parse(localStorage.getItem('allMovies')))
                }

                const lastState = JSON.parse(localStorage.getItem('lastStateMovies'))
                if (!lastState) {
                    return
                }
                setSearchPhrase(lastState.phrase)
                setIsShortMovie(lastState.checkbox)

            } catch (error) {
                console.log(error)
            }
        }
    }, [])


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Switch>

                    <Route exact path="/">
                        <Header onOpen={openMenu} isLoggedIn={isLoggedIn} page={'main'}/>
                        <Main/>
                        <Footer/>
                    </Route>

                    <ProtectedRoute
                        onSubmit={handleSubmitSearchForm}
                        handleCheckBox={handleShortMovie}
                        filteredMovies={allMoviesFiltered}
                        savedMovies={savedMoviesArray}
                        deleteMovie={deleteMovieFromSave}
                        likedMovie={likeMovie}

                        lastState={lastState}
                        message={message} setMessage={setMessage}

                        isLoggedIn={isLoggedIn}
                        isOpenPreloader={isOpenPreloader}
                        onOpen={openMenu}
                        path="/movies" component={Movies}>
                    </ProtectedRoute>

                    <ProtectedRoute
                        filteredMovies={savedMoviesFiltered}
                        handleSearchForm={handleSearchFormSavedMovie}
                        savedMovies={savedMoviesArray}
                        message={message} setMessage={setMessage}
                        setSavedMoviesFiltered={setSavedMoviesFiltered}
                        deleteMovie={deleteMovieFromSave}
                        onSubmitSearchForm={handleSubmitSearchForm} isLoggedIn={isLoggedIn}
                        path="/saved-movies" onOpen={openMenu} component={SavedMovies}
                    >
                    </ProtectedRoute>

                    <ProtectedRoute component={Profile} path="/profile" onOpen={openMenu} isLoggedIn={isLoggedIn}
                                    page={'profile'} onUpdateUser={handleUpdateUser} message={message}
                                    setMessage={setMessage}
                                    onLogout={onLogout}>
                    </ProtectedRoute>

                    <Route path="/signup">
                        {!isLoggedIn ?
                            <Register onRegister={onRegister} setMessage={setMessage} message={message}/>
                            :
                            <Redirect to="/profile"/>
                        }
                    </Route>

                    <Route path="/signin">
                        {!isLoggedIn ?
                            <Login onLogin={onLogin} setMessage={setMessage} message={message}/>
                            :
                            <Redirect to="/profile"/>
                        }
                    </Route>

                    <Route path="/*">
                        <NotFound/>
                    </Route>

                </Switch>
                <Menu onClose={closeMenu} isClose={isCloseMenu}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
