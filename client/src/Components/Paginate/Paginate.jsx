import React from "react";
import style from "../Paginate/Paginate.module.css"

export default function Paginate({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers =[];

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) { //cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(
        <nav className= {style.back} >
            <ul className= {style.ul}>
                {pageNumbers?.map((number) => {
                    return(<li className= {style.list} key={number}>
                         <button  onClick={() => paginado(number)}>{number}</button> 
                    </li>)
                })}
            </ul>
        </nav>
    )
}
