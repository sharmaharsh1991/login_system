/* =================== Create Routes for Users Module  ============================*/

'use strict';

module.exports = function(app) {
/* =================== Call usercontroller function  ============================*/
	
	var userList = require('../controllers/userController'); 
	
/* =================== Add User ============================*/

    app.route("/user/add").post(userList.createNewUser);

    	
/* =================== Login User ============================*/
    app.route("/user/login").post(userList.userLogin);

};