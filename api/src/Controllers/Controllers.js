const axios = require('axios');
const { Dog, Temperaments} = require('../db')


const getApi = async () => {
    const dogsURL = await axios.get('https://api.thedogapi.com/v1/breeds');
    let dogsInfo = await dogsURL.data.map((dog) => {
        return {
                id: dog.id,
                name: dog.name,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: dog.image,
                weight: dog.weight,
                height: dog.height,
            }
        })
        return dogsInfo
    }

const getDB = async () => {
        return await Dog.findAll({
            include: {
                model: Temperaments,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    }

const getAllDogs = async () => {
        let dbInfo = await getDB();
        let apiInfo = await getApi();
        let allInfo = apiInfo.concat(dbInfo);
        return allInfo 
    }
    module.exports = { getAllDogs };