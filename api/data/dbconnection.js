const mongoose = require("mongoose");
require("dotenv").config();
require("../model/movie");
require("../model/review");
require("../model/user-model")


mongoose.connect(process.env.DB_URL);

const callbackify = require("util").callbackify;

const CloseConnectionWithCallback = callbackify(mongoose.disconnect); // check back where to use this callbackify

// database connected
mongoose.connection.on("connected", function(){
    console.log("Connected to database");
});

// database disconnected
mongoose.connection.on("disconnected", function(){
    console.log("Disconnected to database");
});

// database disconnected
mongoose.connection.on("error", function(err){
    console.log("Mongodb error", err);
});

// the sigint listens when we enter ctrl+c, after that, mongoose will close the connection, logs and exits the process 
process.on("SIGINT", function(){
    CloseConnectionWithCallback(function(){
        console.log("termiinated process");
        process.exit();
    });
})



// we can also kill, open and prceoss 