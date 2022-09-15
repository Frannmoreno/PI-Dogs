const { Router } = require('express');
const { getAllDogs } = require('../Controllers/Controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperament} = require('../db')
const router = Router();
const axios = require('axios');
const {Sequelize, Model} = require('sequelize');
const e = require('express');


// Configurar los routers
 router.use('/temperaments', e.json());


router.get('/dogs', async (req,res) => { 
        const name = req.query.name
        const allDogs = await getAllDogs()
        try{
            if(name) {
                const dogSelected = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
                if (dogSelected.length){
                    return res.status(200).send(dogSelected)
                } else {
                    return res.status(404).send({error: 'The dog is at the park'})
                }
            } else {
                return res.status(201).json(allDogs)
            }
        } catch(error){
            res.status(404).send({error: 'The dog is at the park'})
        }
    })

    router.get('/dogs/:idRaza', async (req, res) => {
        const { idRaza } = req.params
        const allDogs = await getAllDogs()
        try {
                const dogSelected = allDogs.filter((dog) => dog.id == idRaza)
                if (dogSelected.length){
                    return res.status(200).send(dogSelected)
                } 
        } catch (error) {
            return res.status(404).send({error: 'The dog is at the park'})
        }
    });

    
    router.get('/temperaments', async (req,res) => {
     try {
            const api = await axios.get('https://api.thedogapi.com/v1/breeds')
            const perros = await api.data.map (el => el.temperament)
            let perrosSplit = await perros.join().split(',')
            let perrosTrim = await perrosSplit.map(e => e.trim())
            await perrosTrim.forEach( async (e) => {
                if(e.length > 0){
                    await Temperament.findOrCreate({
                        where : {name : e}
                    })
                }
            })
            const allTemperament = await Temperament.findAll()
            // console.log(allTemperament)
            return res.status(200).json(allTemperament)
        }catch (error){
             res.status(404).send({error: 'There are not temperaments'})
         }
    })

router.post('/dogs', async (req,res) => {
    // try{
        let {
            name,
            height_min,
            height_max,
            weight_min,
            weight_max,
            lifeTime,
            createdInDb,
            temperament
        } = req.body;

        const dogChecked = await Dog.findOne({
            where: { name: name }
        })
        if(dogChecked) {
            return res.status(404).send('The dog already exist')
        } else {
            let DogCreated = await Dog.create({
                name,
                height_min,
                height_max,
                weight_min,
                weight_max,
                lifeTime,
                createdInDb
            })
            
            let tempDeDB = await Temperament.findAll({
                where: {name: temperament}
            }) 
            DogCreated.addTemperament(tempDeDB)
            return res.status(200).send('The dog was created')
        }
    })
    // } catch (error) {
    //     res.status(404).send({error: 'The dog could not be created'})
    // }
// const CreateDog = async(name, height, weight_min, weight_max, lifeTime, temperament) => {
//     try {
//         let [newDog, created] = await Dog.findOrCreate({
//             where: {
//                 name,
//                 height,
//                 weight_min,
//                 weight_max,
//                 lifeTime
//             }})
//         let temperaments = await Temperaments.findAll({
//             where: {name: temperament}
//         })
//         let temperamentsMaped = temperaments.map(e => e.id);
//         newDog.addTemperaments(temperamentsMaped)
//         return 'Dog was created'
//     } catch (error) {
//         return 'algo salio mal xd'
//     }
//}
// CreateDog(id, name, height, weight_min, weight_max, lifeTime, temperament)

module.exports = router;
