const { Dog, Temperaments } = sequelize.models;


module.exports = {
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
    }
};