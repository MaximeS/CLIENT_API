/**
 * LogConnexionController
 *
 * @description :: Server-side logic for managing logconnexions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getLogConnexionById: function (req,res) {
		return res.ok(LogConnexion.findOne({
			employeeId: req.param('employeeId')
		}).exec(function(err,logconnexion){
			if(logconnexion){
				console.log(logconnexion);
			}
			return logconnexion;
		}));
	},
	
	addLog: function (req,res) {
		LogConnexion.create( {employeeId :req.employeeId , message:req.message}, function function(err,created){
			if(!err) {
				console.log('Log créé.');
			}
			else {
			   return err;
			}
	    });
	}
};

