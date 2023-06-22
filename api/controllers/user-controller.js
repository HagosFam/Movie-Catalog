//const bcrypt = require("bcrypt");
const saltRounds = 13; // Number of salt rounds
const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const register = function (req, res) {
  console.log("Arrived here");
  const response = {
    status: 200,
    message: "",
  };

  const { username, email, password } = req.body;
  if (!req.body) {
    res.status(404).send({ message: "Empty content cannot be saved" });
  }

  User.findOne({ $or: [{ username }, { email }] })
    .then((existingUser) => {
      if (existingUser) {
        response.status = 409;
        response.message = "User with this username and email exists";
        throw response;
      }

      return bcrypt.genSalt(10);
    })
    .then((salt) => {
      return bcrypt.hash(password, salt);

      // return bcrypt.hash(password, salt => {
      //   if (err) {
      //     throw err;
      //   }
      //    hashedPassword;
      // });
    })
    .then((hashedPassword) => {
      const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
      };

      return User.create(newUser);
    })
    .then((savedUser) => {
      response.status = 200;
      response.message = "User saved successfully: ";
    })
    .catch((error) => {
      response.status = error.status || 500;
      response.message = "Error while saving: " + error.message;
    })
    .finally(() => {
      res.status(response.status).send({ message: response.message });
    });
};

const login = function signin(req, res) {
  console.log("login api hit", req.body);
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the entered password with the stored hashed password
      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(401).json({ message: "Invalid password" });
        }
        // Generate an access token using JWT
        const token = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h", // Token expires in 1 hour
          }
        );
        return res.status(200).json({ token: token, user: user });
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = {
  register,
  login,
};
