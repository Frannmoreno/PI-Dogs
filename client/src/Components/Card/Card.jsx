import React from 'react'
import style from './Card.module.css'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { deleteDog } from "../../Redux/Actions";

export default function Card ({ image, name, temperament, weight_min, weight_max, id}) {
    // const dispatch = useDispatch()

    // function handleDelete (id) {
    //     dispatch(deleteDog(id))
    // }


    return (
        <div className={style.card}>
            <div className={style.cardImg}>
                <img className={style.img} src={image} alt={`imagen de: ${name}`} height= '250px' width='200px'/>
            </div>

            <div className={`${style.cardInfo}`}>
                <div className={`${style.titleStyle}`}>
                    <Link to={`/home/${id}`}>
                    <h3>{name}</h3>
                    </Link>
                    <h2>{temperament}</h2>
                    <h2>MIN. WEIGHT: {weight_min} Kg / MAX. WEIGHT {weight_max} Kg</h2>
                    {/* <button onClick={() => handleDelete(id)}>X</button> */}
                </div>
            </div>
        </div>
    )
}