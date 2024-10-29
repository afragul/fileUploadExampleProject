const express=require("express");
const bodyParser = require("body-parser");

const { errorHandler } = require("./middlewares/handlers/errorHandler");

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute= require("./routes/auth").router;
const fileRoute= require("./routes/file").router;

app.use("/file" , fileRoute);
app.use('/auth',authRoute);


//use custom error handler middleware
app.use(errorHandler);

app.listen(3031,function(){
    console.log("running on port 3031");
});
