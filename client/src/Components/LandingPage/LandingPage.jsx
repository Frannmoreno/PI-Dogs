import React from "react";
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'

export default function LandingPage () {
    return (
        <div className= {style.background}> 

            <div className={style.divStyle}>
                <div className={style.info}>
                    <h1>WELCOME TO THE DOGPEDIA</h1>
                    <h2> HERE YOU CAN READ ABOUT DIFFERENTS KIDS OF DOGS </h2>
                    <h2> FILTER THEM BY WEIGHT, NAME AND EVEN CREATE ONE </h2>
                </div>
                <Link to='/home'>
                <button className={style.button}>WOAF!</button>
                </Link>
            </div>
        </div>
    )
}
