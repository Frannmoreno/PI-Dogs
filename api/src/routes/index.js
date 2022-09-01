const { Router } = require('express');
const { getAllDogs } = require('../Controllers/Controllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Dog, Temperaments} = require('../db')
const router = Router();
const axios = require('axios')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/dogs', async (req,res) => { 
        const name = req.query.name
        const allDogs = await getAllDogs()
        if(name) {
            const dogSelected = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()))
            if (dogSelected.length){
                return res.status(201).send(dogSelected)
            } else {
                return res.status(404).send({error: 'The dog is at the park'})
            }
        } else {
            return res.status(200).json(allDogs)
        }
    })


router.get('/dog?name', async(req,res) => {
    try {

    } catch (error) {

    }
})

router.post('/dogs',(req,res) => {
    try{

    } catch (error) {

    }
})

module.exports = router;
