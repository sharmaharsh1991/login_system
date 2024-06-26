/** Main File to run the node **/

'use strict'

/** require express and bodyParser **/

const  express = require("express");
const  bodyParser = require("body-parser");
const cors = require('cors'); 


const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

/** Import API route **/
var routes = require('./routes/userRoutes'); 


/** create express app **/

const  app = express();

/** define port to run express app **/
const  port = process.env.PORT || 3000;

/** use bodyParser middleware on express app **/

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors()); 


/** Add endpoint **/
app.get('/', (req, res) => {
	res.send("App is running");
});

/** Listen to server **/
app.listen(port, () => {
	console.log("Server running at http://localhost:$"+port);
});

routes(app);