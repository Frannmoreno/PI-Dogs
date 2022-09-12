const axios = require('axios');
const { Dog, Temperament} = require('../db')


const getApi = async () => {
    const dogsURL = await axios.get('https://api.thedogapi.com/v1/breeds');
    let dogsInfo = await dogsURL.data.map((dog) => {
        return {
            id : dog.id,
            name : dog.name,
            temperament : dog.temperament,
            weight_min : parseInt(dog.weight.imperial.split("-")[0]),
            weight_max : parseInt(dog.weight.imperial.split("-")[1]),
            height: dog.height.metric,
            lifeTime : dog.life_span,
            image : dog.image.url,
            }
        })
        return dogsInfo
    }

const getDB = async () => {
         let perroMapeado1 =  await Dog.findAll({
            include: {
                model: Temperament,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
        perroMapeado1 = perroMapeado1.map(dog => {return {
            id: dog.id,
            name:dog.name,
            height: dog.height,
            weight_min: dog.weight_min,
            weight_max: dog.weight_max,
            lifeTime: dog.lifeTime,
            image: dog.image,
            createdInDb: dog.createdInDb,
            temperament : dog.temperaments.map(e => {return e.name}).join(',')
        }})
        console.log(perroMapeado1)
        return perroMapeado1
        // await Dog.findAll({
        //     include: {
        //         model: Temperament,
        //         atributes: ['name'],
        //         through: {
        //             attributes: [],
        //         }
        //     }
        // })
    }

const getAllDogs = async () => {
        let dbInfo = await getDB();
        let apiInfo = await getApi();
        let allInfo = apiInfo.concat(dbInfo);
        return allInfo 
    }



    module.exports = { getAllDogs };