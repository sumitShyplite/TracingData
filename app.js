const bodyParser = require("body-parser");

const express = require("express");

const ejs = require("ejs");
const { trackingData } = require("./Controller/trackTime");

require('./Controller/trackTime');


const app = express();

//app.use(express.urlencoded());
const urlencodedParser = bodyParser.urlencoded({extended:false})


app.set( "view engine" , "ejs" )

app.set( "views" , "./view" )

app.get("/",(req,res) =>{

    return res.render("trackingTime");
   
})

 app.post("/trackingTime" , urlencodedParser,trackingData)


app.listen( 3000, () => {

    console.log("Server is running on port 3000");

})

