const getDB = require('./getDB')
const getApi = require('./getApi')

module.exports = {
    getAllDogs: async function () {
        let dbInfo = await getDB();
        let apiInfo = await getApi();
        let allInfo = dbInfo.concat(apiInfo);
        return allInfo 
       }
};