const axios = require('axios');
const dogsURL = await axios.get('https://api.thedogapi.com/v1/breeds');

module.exports = {

    getApi: async function () {
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
    }
};