const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
var express = require('express')
const controllers = require('../Controllers/Controllers')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req,res) => {
    try {
        return res.status(200).json(controllers.getAllDogs())
    } catch(error) {
        return res.status(404).json({error: 'No se pudieron mostrar los perros'})
    }
})


router.post('/dogs',(req,res) => {
    try{

    } catch (error) {

    }
})

module.exports = router;
