import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {postDog, getTemperaments } from "../../Redux/Actions";
import style from './DogCreate.module.css'

const validate = (input) => {
    let errors = {}
    if(!input.name){
        errors.name = 'Must be a name'
    }

    if(input.name && !/^[a-zA-Z]*$/.test(input.name)){
        errors.name = 'The name can not contain numbers or special caracters'
    }

    if(!input.height_min || input.height_min <= 0){
        errors.height_min = 'The min height must be bigger'
    }
    if(!input.height_max || input.height_max <= 0){
        errors.height_max = 'The max height must be bigger'
    }

    if(parseInt(input.height_min) >= parseInt(input.height_max)){
        errors.especial1 = 'The height min can not be bigger or equal than the max height'
    }

    if(parseInt(input.weight_min) >= parseInt(input.weight_max)){
        errors.especial2 = 'The weight min can not be bigger or equal than the max weight'
    }


    if(input.height){
        if (!/^[0-9]*$/){
            errors.height = 'It must be only numbers'
        }
    }
    if (!input.weight_min || input.weight_min <= 0){
        errors.weight_min = 'The min weight must be bigger'
    }

    if(input.weight_min){
        if(input.weight_max){
            if (!/^[0-9]*$/) {
                errors.weight_min = 'It must be only numbers'
            }
        }
    }
    
    if (!input.weight_max || input.weight_max <= 0){
        errors.weight_max = 'The max weight must be bigger'
    }
    if(input.weight_max){
        if (!/^[0-9]*$/) {
            errors.weight_max = 'It must be only numbers'
        }
    }

    if (!input.lifeTime || input.lifeTime <= 0){
        errors.lifeTime = 'The life span must be grather'
    }
    if(input.lifeTime){
        if (!/^[0-9]*$/) {
            errors.lifeTime = 'It must be only numbers'
        }
    }

    return errors

}



export default function CreateDog () {

    const dispatch = useDispatch();

    const history = useHistory()

    const allTemperaments = useSelector((state) => state.temperaments)

    const [errors , setErrors] = useState({})

    const [input, setInput] = useState({
        name : "",
        height_min:0,
        height_max:0,
        weight_min:0,
        weight_max:0,
        lifeTime:0,
        image : "",
        temperament:[]
    })

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        console.log(e.target.value)
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    useEffect(() => {
        dispatch(getTemperaments()) 
    },[dispatch])

    const handleSelect = (e) => {
            if(!input.temperament.includes(e.target.value)){
                setInput({
                    ...input,
                    temperament : [...input.temperament, e.target.value]
                })
            }
    }

    console.log(handleSelect)

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(input)
        dispatch(postDog(input))

        alert("The dog was created")
        setInput({
            name: "",
            height_min: 0,
            height_max: 0,
            weight_min: 0,
            weight_max: 0,
            lifeTime: 0,
            temperament: []
        })
        history.push('/home')
    }

    const handleErase = (e) => {
        setInput({
            ...input,
            temperament : input.temperament.filter(d => d !== e)
        })
    }

    return(

        <div className={style.background}>
            
            <div className={style.titulo}>
            <Link to ="/home">
                <button className={style.btn}>
                    HOME
                </button>
            </Link>
                <h2>
                    CREATE DOG
                </h2>
            </div>

        <div className= {style.contenedor}>
                    
            <form className= {style.formStyle} onSubmit={e => handleSubmit(e)} >

        <div className = {style.items}>
            <h3>NAME:</h3>
            <input required className={style.numInput} type='text' value={input.name} name="name"  onChange={e => handleChange(e)} />

        </div>

        <div className = {style.items}>
            <h3 >MIN HEIGHT:</h3>
            <input min='0'  className={style.numInput} type='number' value={input.height_min} name='height_min' onChange = { e => handleChange(e)}  />
        </div>

        <div className = {style.items}>
            <h3 >MAX HEIGHT:</h3>
            <input  min='0' className={style.numInput} type='number' value={input.height_max} name='height_max' onChange = { e => handleChange(e)}  />
        </div>

        <div className = {style.items}>
        <h3 >MIN WEIGHT: </h3>
        <input  min='0' className={style.numInput} type='number' value={input.weight_min} name="weight_min" onChange={e => handleChange(e)} />
        </div>

        <div className = {style.items}>
        <h3 >MAX WEIGHT: </h3>
        <input min='0' className={style.numInput} type='number' value={input.weight_max} name="weight_max" onChange={e => handleChange(e)} />
        </div>


        <div className = {style.items}>
            <h3>LIFE SPAN:</h3>
            <input min='0' className={style.numInput} type='number' value={input.lifeTime} name="lifeTime" onChange={e => handleChange(e)} />
        </div>
        <div>

        </div>
            <div className = {style.items}>
                <h3>TEMPERAMENTS</h3>
                <select  className={style.numInput} onChange={handleSelect} >
                    <option value='all' disabled selected defaultValue>prototemperament</option>
                    {
                        allTemperaments.map(e => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                                )
                            })
                        }
                </select>
            </div>

                {errors && 
                (errors.name ||
                errors.height_min ||
                errors.height_max ||
                errors.weight_min||
                errors.weight_max ||
                errors.lifeTime ||
                errors.especial1 ||
                errors.especial2 ||
                !input.name.length ||
                input.height_min <= 0||
                input.height_max <= 0||
                input.weight_min <= 0 ||
                input.weight_max <= 0 ||
                input.lifeTime <= 0 ||
                input.height_min >= input.height_max ||
                input.weight_min >= input.weight_max ||
                !input.temperament.length)
                ?

                <div className={style.btnh2} >THE DOG CAN NOT BE CREATED YET</div>
                :
                <button className={style.btn} type='submit'>CREATE</button>
                
            }
                </form>
         
                  <div className= {style.moodDiv} >
                        {input.temperament.map((d , i) => {
                            return (
                                <div key={i++}>
                            <div className={style.btnh3}> {d} </div>
                            <button className= {style.eraserbtn} onClick={() => handleErase(d)}>X</button>
                            </div>
                                )
                            })
                        }
                        </div>
                        
                <div className= {style.errorStyle}>
                <h2>ERRORS :</h2>
                <div>
                <div className= {style.errorStyle}> 

            <h2>
             {errors.name && (<p> {errors.name} </p>)}
            </h2>

            <h2>
            {errors.height_min && (<p> {errors.height_min} </p>)}
            </h2>

            <h2>
            {errors.height_max && (<p> {errors.height_max} </p>)}
            </h2>

            <h2>
            {errors.weight_min && (<p> {errors.weight_min} </p>)}
            </h2>

            <h2>
            {errors.weight_max && (<p> {errors.weight_max} </p>)}
            </h2>
            
            <h2>
            {errors.lifeTime && (<p> {errors.lifeTime} </p>)}
            </h2>

            <h2>
            {errors.temperament && (<p> {errors.temperament} </p>)}
            </h2>

            <h2>
            {errors.especial1 && (<p> {errors.especial1} </p>)}
            </h2>

            <h2>
            {errors.especial2 && (<p> {errors.especial2} </p>)}
            </h2>

                </div>
                </div>
                </div>
                </div>
            </div>
    )
}