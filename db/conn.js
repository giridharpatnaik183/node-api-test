const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sambit98530:r7hxkr73skPEq2V5@cluster0.v1rtctx.mongodb.net/', { useNewUrlParser: true })
    .then(() => {
        console.log("Connection with db is Successfull");
    }).catch((err) => {
        console.log("Error while connection with db is", err);
   })
