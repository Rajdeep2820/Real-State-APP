const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("connected to DB");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
};


const {PORT} = 8080;

app.listen(PORT , ()=>{
    console.log("Server working on port 8080.");
})

app.post("/api/properties" , async(req,res) => {
    try{
        const{title , description , image, contact} = req.body;

        if(!title || !description || !image || !contact){}
    }
    catch(error){

    }
})
app.get("/api/properties" , async (req,res) => {
    try{
        const properties = await Property.find();
        res.json(properties);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
})
