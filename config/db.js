const mongoose = require('mongoose');
const config = require('./config');

/**
 * la configuracion de las uriDB y opcionUriDB
 * se encuentran en el directorio /config/config.js
 * 
 */
mongoose.connect(config.urlDB, config.opcionUrlDB)
  .then(()=>{
    console.log('La coneccion a la DB ha sido satisfactoria.')
  })
  .catch((error)=>{
    console.log(`Error en la coneccion: ${error}`)
  });

module.exports = mongoose;