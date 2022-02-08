import React from "react";
import "./Preloader.css"


function Preloader(props) {
    const preloaderStyle = props.isOpen ? "preloader preloader-open" : "preloader"

    return (
        <div className={preloaderStyle}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
}

export default Preloader;
