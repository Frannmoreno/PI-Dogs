const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {

    id : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey: true
      
    },
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height_min: {
      type : DataTypes.INTEGER,
      allowNull : false
    },

    height_max: {
      type : DataTypes.INTEGER,
      allowNull : false
    },

    weight_min: {
      type: DataTypes.INTEGER,
      allowNull: false
},
    weight_max: {
      type: DataTypes.INTEGER,
      allowNull: false
},

    lifeTime: {
      type: DataTypes.INTEGER
},

  image : {
    type :DataTypes.STRING,
    defaultValue: 'https://www.quever.news/u/fotografias/m/2021/11/13/f608x342-18737_48460_0.jpg'
  },

  createdInDb : {
   type:  DataTypes.BOOLEAN,
   allowNull : false,
   defaultValue : true
  }
  },
  {timestamps : false} 
  );

};