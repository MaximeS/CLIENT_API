/**
* ServiceAdministratif.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
		employeeId: { 
			type: 'employee',
			unique: true,
			required: true
		}, 
		isAdminService:{
			type: 'boolean',
			defaultsTo: false
		},
		toJSON: function(){
			var obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
  }
};

