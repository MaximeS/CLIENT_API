/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var bcrypt = require('bcryptjs');
var _userController = require('./EmployeeController');

module.exports = {
    login: function(req,res){
        console.log("Reçus")
        var email = req.param('email');
        var password = req.param('password');
        if(!email || !password) return res.json(401,{err:'email and password are required'})
        Employee.findOne({email:email}, function(err,employee){
            if(err)console.log(err);
            if(err) return res.json(403, {err:'forbidden'});
            if(!employee){
                console.log("Erreur1"); 
                return res.json(401,{err:'invalid email or password'});
            }
            Employee.comparePassword(password,employee, function(err,valid){
                if(err)console.log(err);
                if(err) return res.json(403, {err:'forbidden'});
                if(!valid){console.log("Erreur2"); return res.json(401,{err:'invalid email or password'});}
                token = JwtHandler.generate({email:employee.email,id: employee.id});
                employee.token = token;
                employee.save(function(err){
                    if(err){
                        console.log(err); 
                        return res.json(403, {err:'forbidden'});
                    } 
                    return res.json(
                        {
                            employee: employee,
                            token:token
                        }
                    )
                })
            })
        })
    },
    loginAdmin: function(req,res){
        console.log("Reçus")
        var email = req.param('email');
        var password = req.param('password');
        if(!email || !password) return res.json(401,{err:'email and password are required'})
        Employee.findOne({email:email}, function(err,employee){
            if(err)console.log(err);
            if(err) return res.json(403, {err:'forbidden 1'});
            if(!employee){
                console.log("Erreur1"); 
                return res.json(401,{err:'invalid email or password'});
            }
            if(employee.nvAuto != 2){ return res.json(401,{err:"vous n'avez pas les droits nécessaires"});}
            Employee.comparePassword(password,employee, function(err,valid){
                if(err)console.log(err);
                if(err) return res.json(403, {err:'forbidden 2'});
                if(!valid){console.log("Erreur2"); return res.json(401,{err:'invalid email or password'});}
                token = JwtHandler.generate({email:employee.email,id: employee.id});
                employee.token = token;
                employee.save(function(err){
                    if(err){
                        console.log(err); 
                        return res.json(403, {err:'forbidden 3'});
                    } 
                _EmployeeController.ListUserForManager(req,res);
                })
            })
        })
    },
    refresh: function(req,res){
       var employee = req.employee || false;

        if(employee){
            var decoded = JwtHandler.decode(employee.refreshToken);
            if(decoded.email === user.email){
                token = JwtHandler.generate({email:employee.email,id: employee.id});
                employee.token = token;
                employee.save(function(err){
                    if(err) return res.json(403, {err:'forbidden'});
                    return res.json(
                        {
                            employee: employee,
                            token:token
                        }
                    )
                })
            }
        }else{
            return res.json(403, {err:'forbidden'});
        }
    }
};

