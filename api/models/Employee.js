/**
* Employee.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {   

	attributes: {
		employeeId: { 
			type: 'INTEGER',
			unique: true,
			required: true
		}, 
		isAdmin:{
			type: 'boolean',
			defaultsTo: false
		},
		rank:{
			type: 'INTEGER',
			defaultsTo: 0
		},
		firstName: {
			type: 'STRING',
			required: true
		},	
		lastName:  {
			type: 'STRING',
			required: true
		},
		age: { 
			type: 'INTEGER',
			required: true
		},     
		birthDate:  {
			type: 'DATE',
			required: true
		}, 
		phoneNumber: {       
			type: 'STRING',
			required: true
		},     
		emailAddress: {       
			type: 'email',
			unique: true,
			required: true		
		},
		password: {       
			type: 'STRING',
			required: true		
		},     
		
		toJSON: function(){
			var obj = this.toObject();
			delete obj.password;
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	},
	
	beforeCreate: function(values, next){
		SecurityService.hashPassword(values);
		next();
	},
	
	beforeUpdate: function(values, next){
		SecurityService.hashPassword(values);
		next();
	}
	
};

