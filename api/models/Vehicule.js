/**
 * Vehicule.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: [ 'rabbitCluster', 'DBmysql' ],
  routingKey: [ 'parentVehicule' ],
  attributes: {
 
    parentVehicule: {
      model: 'vehicule'
    },
  	employee:{
  		model: 'employee',
  	},
  	positionX:{
  		type: 'float',
  		required: true,
  	},
  	positionY:{
  		type: 'float',
  		required: true,
  	},
  	tempsArrêt:{
  		type: 'float',
  	},
  	accélération:{
  		type: 'float',
  	},
  	vitesseMax:{
  		type: 'integer',
  	},
  	vitesseMin:{
  		type: 'integer',
  	},
  	vitesseMoy:{
  		type: 'float',
  	},
  	immatriculation:{
  		type: 'string',
  		required: true,
  	},
  }
};

