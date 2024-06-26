var mysql = require('mysql');
var connection = mysql.createConnection({
	host:process.env.HOST,
	user:process.env.DB_USER, //Your Database User Name
	password:process.env.DB_PASSWORD, // Your Database Password
    database: process.env.DATABASE,
    insecureAuth : true
});
connection.connect(function(error){
	if(!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully..!!');
	}
});

module.exports = connection;