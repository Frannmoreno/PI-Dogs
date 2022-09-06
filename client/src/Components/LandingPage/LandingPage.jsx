import React from "react";
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage () {
    return (
        <div className= {style.mainDiv}> 
            <Link to='/home'>
            <button className={style.button85}>WOAF!</button>
            </Link>
        </div>
    )
}
