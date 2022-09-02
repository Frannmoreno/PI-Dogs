const { Router } = require('express');
const { getAllDogs } = require('../Controllers/Controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperaments} = require('../db')
const router = Router();
const axios = require('axios');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req,res) => { 
        const name = req.query.name
        const allDogs = await getAllDogs()
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
    })


router.get('/temperaments', async (req,res) => {
    try {
        const dataApi = await axios.get('https://api.thedogapi.com/v1/breeds');
        const temperaments = await dataApi.data?.map(temp => temp.temperament) // obtengo todos los temperamentos
        const tempOrd = temperaments.join(',').split(',').sort()
        const newsTemps = new Set(tempOrd)
        newsTemps.forEach(el => {
            if(el.length >= 1) {
                Temperaments.findOrCreate({
                    where: {name: el}
                })
            } else null
        })
        const entregoDB = await Temperaments.findAll()
        res.status(202).json(entregoDB)
    }catch (error){
        res.status(404).send({error: 'There are not temperaments'})
    }
   
})







router.post('/dogs',(req,res) => {
    try{

    } catch (error) {

    }
})

module.exports = router;
