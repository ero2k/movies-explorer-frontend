import React from "react";
import "../../index.css"
import "./App.css"
import Main from "../Main/Main"
import Header from "../Header/Header"
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";


function App() {
    const [isCloseMenu, setCloseMenu] = React.useState(false)
    // const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)

    const closeMenu = () => {
        setCloseMenu(false)
    }
    const openMenu = () => {
        setCloseMenu(false)
    }


    return (
        <div className="page">
            <Header onOpen={openMenu}/>
            <Switch>
                <Route exact path="/">
                    <Main/>
                </Route>
                <Route path="/movies">
                    <Movies/>
                </Route>
                <Route path="/favorite-movies">
                    <SavedMovies/>
                </Route>
                <Route path="/profile">
                    <Profile/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/*">
                    <NotFound/>
                </Route>
            </Switch>
            <Menu onClose={closeMenu} isClose={isCloseMenu}/>
            <Footer/>
        </div>
    );
}

export default App;
