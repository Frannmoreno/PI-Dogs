const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var express = require('express');
const { getAllDogs } = require('../Controllers/Controllers');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req,res) => {
    const { name } = req.query 
    if (name) {
        let allDogs = await getAllDogs()
        let dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
        if (dogName.length){
            return res.status(200).json(dogName)
        } else {
            return res.status(404).json({error: 'The dog in nos avaleable'})
    }
  }
  return res.status(200).json(getAllDogs())
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
