
var dbConn  = require('../db/dataBase');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var saltRounds = 10;
const Schema = require("./../validations/userValidations")

//register function
exports.createNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let errors = false;

   var validation = Schema.userPOST.validate(req.body);
  if (validation.error)
  {
    var error = validation.error.details[0].message;
    res.status(400).json({ success: false, message: "Invalid Input", error });
  } else
  {

    if (email.length === 0 || password.length === 0)
    {
      errors = true;
      req.send('error', "Please enter name and email");
    }


    if (!errors)
    {
      dbConn.query("SELECT * FROM users WHERE email ='" + req.body.email + "'", function (err, result) {
        if (err)
        {
          res.send({
            status: false,
            message: err
          })
        }
        if (result.length > 0)
        {
          res.send({
            status: false,
            message: "A user with this email already exists. Use a different email address."
          })
        }
        else
        {

          userpassword = req.body.password;
          hashpass = bcrypt.hashSync(userpassword, saltRounds);
          newpassword = hashpass

          var form_data = {
            email: req.body.email,
            password: newpassword,
          }
          // insert query
          dbConn.query('INSERT INTO users SET ?', form_data, function (err, result) {
            if (err)
            {
              res.send({
                status: false,
                message: "Something went wrong"
              })
            } else
            {
              res.send({
                status: true,
                message: "User successfully added"
              })
            }
          })
        
        }
      }
      )
    }
  }
}


// login function
exports.userLogin = async (req, res) => {
   dbConn.query(
    `SELECT * FROM users WHERE email = ${dbConn.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        return res.status(400).send({
          msg: err
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: 'Email or password is incorrect!'
        });
      }
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            return res.status(401).send({
              msg: 'Email or password is incorrect!'
            });
          }
          if (bResult) {
            const token = jwt.sign({id:result[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });
            return res.status(200).send({
              msg: 'Logged in!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
      );
    }
  );
}
