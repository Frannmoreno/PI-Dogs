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

    router.get('/dogs/:idRaza', async (req, res) => {
        const { idRaza } = req.params
        const allDogs = await getAllDogs()
            const dogSelected = allDogs.filter((dog) => dog.id == idRaza)
            if (dogSelected.length){
                return res.status(200).send(dogSelected)
            } else {
                return res.status(404).send({error: 'The dog is at the park'})
            }
    });

    
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
        res.status(200).json(entregoDB)
    }catch (error){
        res.status(404).send({error: 'There are not temperaments'})
    }
   
})

router.post('/dogs', async (req,res) => {
    try{
        let {
            name, 
            min_height,
            max_height,
            min_weight,
            max_weight,
            life_span,
            temperament,
            image,
        } = req.body;


        const dogWeight = []
        const minWeight = min_weight
        const maxWeight = max_weight
        dogWeight.push(minWeight, maxWeight)
        
        const dogHeight = []
        const minHeight = min_height
        const maxHeight = max_height
        dogHeight.push(minHeight,maxHeight)



        let dogCreated = await Dog.create({
            name,
            weight: dogWeight,
            height: dogHeight,
            life_span,
            image: image ? image : 'https://www.google.com/search?q=fotos+de+perritos+con+traje+de+chucky&tbm=isch&ved=2ahUKEwiOpZDYiPf5AhU4s5UCHajnCLsQ2-cCegQIABAA&oq=fotos+de+perritos+con+traje+de+chucky&gs_lcp=CgNpbWcQAzoECCMQJzoECAAQQzoFCAAQgARQgRVYijVg5DdoAHAAeACAAWWIAYENkgEEMjAuMZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=s3cSY87_M7jm1sQPqM-j2As&bih=609&biw=1280#imgrc=KN3pLa5A1c27fM',
        })

        let dogDB = await Temperaments.findAll({
            where: {name: temperament}
        })
        dogCreated.addTemperaments(dogDB)
        res.status(200).send('The dog was created')

    } catch (error) {
        res.status(404).send({error: 'The dog could not be created'})
    }
})



module.exports = router;
