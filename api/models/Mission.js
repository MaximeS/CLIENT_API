/**
 * Mission.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    employee:{
  		model: 'employee',
  	},
  	siteD:{
  		model: 'site',
  	},
  	siteA:{
  		model: 'site',
  	},
  	anomalies:{
  		collection: 'anomaly',
  		via: 'mission',
  	},
  	heureD:{
  		type: 'integer',
  	},
  	heureF:{
  		type: 'integer',
  	},
  	logsS:{
  		collection: 'logs',
  		via: 'mission',
  	},
    valider:{
      type: 'boolean',
    },
  }
};

