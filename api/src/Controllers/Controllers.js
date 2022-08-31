const axios = require('axios');

module.exports = {
    
    getApi: async function () {
        const dogsURL = await axios.get('https://api.thedogapi.com/v1/breeds');
        let dogsInfo = await dogsURL.data.map(dog => {
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
    },

    getDB: async function () {
        return await Dog.findAll({
            include: {
                model: Temperaments,
                atributes: ['name'],
                throught: {
                    atributes: [],
                }
            }
        })
    },

    getAllDogs: async function () {
        let dbInfo = await getDB();
        let apiInfo = await getApi();
        let allInfo = dbInfo.concat(apiInfo);
        return allInfo 
       }
};