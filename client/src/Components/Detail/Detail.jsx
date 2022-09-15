import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDog, clearDetail } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import style from "../Detail/Detail.module.css";

export default function Detail(props) {
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.dogDetail)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getDog(props.match.params.id));
        return dispatch(clearDetail())
    }, [dispatch]);

    return(
        <div className={style.background}>
            <Link to="/home">
                <button className={style.btn}>
                    Go Home
                </button>
            </Link>
        {Object.keys(dog).length ? 
        <div className={style.general}>
                <img src={dog[0].image ? dog[0].image : dog[0].image = "https://www.nextdayflyers.com/blog/wp-content/uploads/2014/10/Pet-Flyer-1-768x1024.jpg"} alt="woof" width="400" height="400" />
        <div className={style.dogdetail} >
        
        <h1> Name : {dog[0].name}</h1>
        <h2> Life Temp : {dog[0].lifeTime}</h2>
        <h2> Weight :{dog[0].weight_min} - {dog[0].weight_max} KG</h2>
        <h2> Height :{dog[0].height} CM</h2>
        <div>
        <h2>Temperaments :</h2>
        <h2>{dog[0].temperament}</h2>
        </div>
        </div>

    </div>
                : <div> <h1>LOADING...</h1> </div> }
        </div>
        )
}