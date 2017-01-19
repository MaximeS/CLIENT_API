/**
 * EmployeeControllerController
 *
 * @description :: Server-side logic for managing Employeecontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {

	me: function (req,res){
		return res.ok({employee: req.employee})
	},
	
	getEmployee: function (req,res) {
		return res.ok(Employee.findOne({
			id: req.param('id')
		}).exec(function(err,employee){
			if(employee){
				console.log(employee);
			}
			return employee;
		}));
	},
	ListMissionsForUser: function(req,res){
		var param = req.allParams();

		console.log("id user = "+req.user.id);
		User.findOne(req.user.id).populate('missions').exec(function (err, user){
			if (err) return res.serverError(err);
			if (!user) { console.log("Error 1 : Affichage Missions"); }
			else {
				console.log(user.missions);
				return res.json(user.missions);	
			}
		})
	},
	ListUserForManager: function(req,res){
		if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
		var param = req.allParams();
		console.log("coucou");
		User.findOne(req.user.id).exec(function (err,user){
			if (err) return res.serverError(err);
			if (!user) { console.log("Error 1 : User doesn't exist"); }
			User.find({manager:user.id}).exec(function (err, users){
				/*_.each(users, function(U){
					Vehicule.findOne(U.vehicule).exec(function(err, vehicule){
						Vehicule.subscribe(req.socket, vehicule.id);
						sails.log('vehicule' + vehicule.id + 'has been subscribed');
					})
				})*/
				return res.json(users);
			})
		})
	},
	GetLocalisation: function(req,res){
		var param = req.allParams();
		User.findOne(req.user.id).exec(function (err, user){
			if (err) return res.serverError(err);
			if (!user) { console.log("Error 1 : User doesn't exist"); }
			Vehicule.update({id:user.vehicule}, {positionY:param.lat, positionX:param.long}).exec(function update(err,updated){
						// your change to the user was saved.
				if (err){ return res.serverError(err);}
				console.log(updated);
				Vehicule.publishUpdate(updated[0].id, {vehicule:updated[0]});
			});
			return res.json("ok");
		})
	}
	
};

