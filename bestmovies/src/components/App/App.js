import React, {useState, useEffect} from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
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
        setMessage('')
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('saved-movies');
        history.push('/signin');
    };

    function handleShortMovie() {
        setIsShortMovie(!isShortMovie)
    }

    const filteredMovies = React.useCallback( (moviesForFiltered) => {
        const filterByPhrase = moviesForFiltered.filter(movie => movie.nameRU.toLowerCase().trim().includes(searchPhrase.toLowerCase().trim()))
        if (!isShortMovie) {
            return filterByPhrase
        }
        return filterByPhrase.filter(movie => movie.duration <= DURATION_SHORT_MOVIE)
    },[isShortMovie, searchPhrase])

    useEffect(() => {
        setAllMoviesFiltered(filteredMovies(allMoviesArray))
        if (allMoviesFiltered.length === 0) {
            setMessage('Ничего не найдено')
        }
    }, [allMoviesArray, filteredMovies])

    useEffect(() => {
        setSavedMoviesFiltered(filteredMovies(savedMoviesArray))
// eslint-disable-next-line
    }, [savedMoviesArray])

    const handleSubmitSearchForm = (e) => {
        e.preventDefault()
        setSavedMoviesFiltered(filteredMovies(savedMoviesArray))

        if (savedMoviesFiltered.length === 0) {
            setMessage('Ничего не найдено')
        }
    }

    const getAllMovies = async (e) => {
        e.preventDefault()
        setMessage('')

        try {
            setOpenPreloader(true)
            const movies = await apiMovies.getInitialCards()
            await localStorage.setItem('movies', JSON.stringify(movies))
            setAllMoviesArray(JSON.parse(localStorage.getItem('movies')))
            setOpenPreloader(false)

        } catch (error) {
            setMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
            console.log(error)
        }
    }

    const getSavedMovies = async () => {
        try {
            localStorage.removeItem('savedMovies')

            const savedMovies = await apiMain.getSavedMovies(localStorage.getItem('jwt'))
            await localStorage.setItem('savedMovies', JSON.stringify(savedMovies))
            setSavedMoviesArray(JSON.parse(localStorage.getItem('savedMovies')))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(!!currentUser.email){
            try {
                getSavedMovies()
            } catch (error) {
                console.log(error)
            }
        }

    }, [currentUser])

    const likeMovie = async (movieData) => {
        try {
            await apiMain.likedMovie({...movieData}, localStorage.getItem('jwt'))
            await getSavedMovies()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMovieFromSave = async (idCard) => {
        try {
            await apiMain.deleteMovie(idCard, localStorage.getItem('jwt'))
            await getSavedMovies()
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        setMessage('')
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

                    <ProtectedRoute isOpenPreloader={isOpenPreloader} likedMovie={likeMovie}
                                    handleCheckbox={handleShortMovie}
                                    deleteMovie={deleteMovieFromSave}
                                    savedMovies={savedMoviesArray} filteredMovies={allMoviesFiltered}
                                    searchPhrase={searchPhrase} handleInput={setSearchPhrase}
                                    submitSearch={getAllMovies} onOpen={openMenu}
                                    isLoggedIn={isLoggedIn} message={message} setMessage={setMessage}
                                    path="/movies"
                                    component={Movies}>
                    </ProtectedRoute>

                    <ProtectedRoute isShortMovie={isShortMovie} handleCheckbox={handleShortMovie} likedMovie={likeMovie}
                                    filteredMovies={savedMoviesFiltered} setSavedMovies={setSavedMoviesFiltered}
                                    component={SavedMovies} savedMovies={savedMoviesArray}
                                    message={message} setMessage={setMessage}
                                    isLoggedIn={isLoggedIn} path="/saved-movies" searchPhrase={searchPhrase}
                                    handleInput={setSearchPhrase} onSubmitSearchForm={handleSubmitSearchForm}
                                    onOpen={openMenu} page={'saved-movies'} deleteMovie={deleteMovieFromSave}>
                    </ProtectedRoute>

                    <ProtectedRoute component={Profile} path="/profile" onOpen={openMenu} isLoggedIn={isLoggedIn}
                                    page={'profile'} onUpdateUser={handleUpdateUser} message={message}
                                    setMessage={setMessage}
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
                <Menu onClose={closeMenu} isClose={isCloseMenu}/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
