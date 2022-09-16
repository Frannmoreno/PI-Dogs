import React, { useEffect } from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { useState, } from "react";
import { filterByName, filterCreatedDog, filterByWeight, FilterByTemperament, getAllDogs, getTemperaments } from "../../Redux/Actions";
import Card from "../Card/Card";
import SearchBar from '../SearchBar/SearchBar'
import Paginate from '../Paginate/Paginate'
import style from '../Home/Home.module.css'



export default function Home () {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => { return state.temperaments})
    const [orden, setOrden] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogPerPage] = useState(8)
    const indexLastDog = currentPage * dogsPerPage
    const indexFirstDog = indexLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexFirstDog,indexLastDog)
    
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
    },[])

    function handleClick (e) {
        window.location.reload(false);
    }

    function handlerFilterCreated (e) {
        dispatch(filterCreatedDog(e.target.value))
        setCurrentPage(1)
    }
    
    function handlerFilterTemperament (e) {
        e.preventDefault();
        dispatch(FilterByTemperament(e.target.value))
        setCurrentPage(1)
    }

    function handlerFilterName (e) {
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handlerFilterWeight (e) {
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
<div className = {style.background}>
    <header>
        <div className={style.arreglar}>
            <Link to="/">
                <button className={style.logo}>Dogpedia</button> 
            </Link>
        </div>
    <div className={style.headerContainerLeft}>  
             <div className = {style.arreglo}>
                    <button  className = {style.btn} onClick={e =>{handleClick(e)}}> Get dogs again</button>
                    <Link to='/create'>
                        <button className = {style.btn} >Create Dog</button>
                    </Link>
             </div>
        <div className={style.headerLeft}>
            <SearchBar paginado={paginado}/>
            <div className={style.containerFilters}>
                <select onChange={e => handlerFilterName(e)}>
                    <option disabled selected defaultValue>
                        Order by name
                    </option>
                    <option key={1} value='A-Z'>A-Z</option>
                    <option key={2} value='Z-A'>Z-A</option>
                </select>

                <select onChange={e => handlerFilterWeight(e)}>
                    <option disabled selected defaultValue>
                        Order by wieght
                    </option>
                    <option key={1} value="max_weight">Max</option>
                    <option key={2} value="min_weight">Min</option>
                </select>

                <select onChange={e => handlerFilterCreated(e)}>
                    <option disable selected defaultValue> 
                        Order by created
                    </option>
                    <option key={1} value='all'>All</option>
                    <option key={2} value='created'>Created</option>
                    <option key={3} value='api'>Api</option>
                </select>


                <select onChange={e => handlerFilterTemperament(e)}>
                    <option disabled selected defaultValue>Temperaments</option>
                    <option key={1+'e'} value='All'>All</option>
                    {
                        allTemperaments.map(temp => (
                            <option value={temp.name} key={temp.id}>{temp.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    </div>
           
        </header>    
            
    <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/>
            
         <div>  
            
                {Object.keys(allDogs).length ? 
                    <div className={style.container_cards} >  
                    {currentDogs?.map((el) => {
                        return(
                            <div className={style.main_container} key={el.id}>
                            {
                                <Card key={el.id} id={el.id} image={el.image} name={el.name} temperament={el.temperament}  weight_min={el.weight_min} weight_max={el.weight_max}/>
                            }
                            </div>
                            )
                        })}
            </div> :
                    <div>
                        <h1>LOADING...</h1>
                    </div>}
        </div>
</div>
)}
