import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {postDog, getTemperaments } from "../../Redux/Actions";
import style from './DogCreate.module.css'

const validate = (input) => {
    let errors = {}
    if(!input.name){
        errors.name = 'Indica un nombre,  humano! WOOF!!!'
    }
    if(!input.height || input.height <= 0){
        errors.height = 'Indica un numero mayor , ni mis cachorros miden eso WOOF!!!'
    }
    if(input.height){
        if (!/^[0-9]*$/){
            errors.height = 'Woof... ¿Como pusiste letras? Solo numeros WOOF WOOF WOOF WOOF WOOF AARRGGHHH'
        }
    }
    if (!input.weight_min || input.weight_min <= 0){
        errors.weight_min = 'Indica un numero mayor , ni mis cachorros pesan eso WOOF!!!'
    }

    if(input.weight_min){
        if(input.weight_max){
            if (!/^[0-9]*$/) {
                errors.weight_min = 'Woof... ¿Como pusiste letras? Solo numeros WOOF WOOF WOOF WOOF WOOF AARRGGHHH'
            }
        }
    }
    
    if (!input.weight_max || input.weight_max <= 0){
        errors.weight_max = 'Indica un numero mayor , ni mis cachorros pesan eso WOOF!!!'
    }
    if(input.weight_max){
        if (!/^[0-9]*$/) {
            errors.weight_max = 'Woof... ¿Como pusiste letras? Solo numeros WOOF WOOF WOOF WOOF WOOF AARRGGHHH'
        }
    }

    if (!input.lifeTime || input.lifeTime <= 0){
        errors.lifeTime = '... De verdad espero que nadie tenga ese tiempo de vida, woof triste :c'
    }
    if(input.lifeTime){

        if (!/^[0-9]*$/) {
            errors.lifeTime = 'Woof... ¿Como pusiste letras? Solo numeros WOOF WOOF WOOF WOOF WOOF AARRGGHHH'
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
        height:0,
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
        setInput({
            ...input,
            temperament : [...input.temperament, e.target.value]
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(input)
        dispatch(postDog(input))

        alert("Guau guau creado con croquetas")
        setInput({
            name: "",
            height: 0,
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

        <div className='background'>
            
            <Link to ="/home">
                <button className='btn'>
                    Volver
                </button>
            </Link>
            <h1>
                Crear Guau Guau 
            </h1>

        <div className='contenedor'>
                    
            <form className='formStyle' onSubmit={e => handleSubmit(e)} >

        <div>
            <h3>Nombre:</h3>
            <input className='numInput' type='text' value={input.name} name="name"  onChange={e => handleChange(e)} />

        </div>

        <div>
            <h3>Altura</h3>
            <input className='numInput' type='number' value={input.height} name='height' onChange = { e => handleChange(e)}  />
        </div>

        <div>
        <h3>Peso minimo </h3>
        <input className='numInput' type='number' value={input.weight_min} name="weight_min" onChange={e => handleChange(e)} />
        </div>

        <div>
        <h3>Peso Maximo </h3>
        <input className='numInput' type='number' value={input.weight_max} name="weight_max" onChange={e => handleChange(e)} />
        </div>


        <div>
            <h3>Tiempo de vida </h3>
            <input className='numInput' type='number' value={input.lifeTime} name="lifeTime" onChange={e => handleChange(e)} />
        </div>
        <div>

        </div>
            <h2>Temperamentos</h2>
            <select  className='moodStyle' onChange={e => handleSelect(e)} >
                <option value="all">prototemperament</option>
                {
                    allTemperaments.map(e => {
                        console.log()
                        return (
                            <option value={e.name} key={e.name}>{e.name}</option>
                            )
                        })
                    }
            </select>

                {errors && 
                (errors.name ||
                errors.height ||
                errors.weight_min||
                errors.weight_max ||
                errors.lifeTime ||
                errors.temperament||
                !input.name.length ||
                input.height <= 0||
                input.weight_min <= 0 ||
                input.weight_max <= 0 ||
                input.lifeTime <= 0 ||
                !input.temperament.length)
                ?
                <h3>Guau Guau no puede ser creado aún</h3>
                :
                <button className='btn' type='submit'>Crear guau guau</button>
                
            }
                </form>
         
                  <div className='moodDiv'>
                        {input.temperament.map((d , i) => {
                            return (
                                <div key={i++}>
                            <h2 > {d} </h2>
                            <button className='searchBtn' onClick={() => handleErase(d)}>X</button>
                            </div>
                                )
                            })
                        }
                        </div>
                        
                <div className='errorStyle'>
                <h1>Errores :</h1>
                <div>
                <div className='errorStyle'> 

            <h2>
             {errors.name && (<p> {errors.name} </p>)}
            </h2>

            <h2>
            {errors.height && (<p> {errors.height} </p>)}
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
                <h1>Esto debe quedar vacío para crear tu guau guau</h1>

                </div>

                </div>
                </div>
                        
                        </div>
            </div>
    )
}