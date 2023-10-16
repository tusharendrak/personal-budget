const express=require('express');
const cors=require('cors');
const app=express();
const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const fs=require("fs");
const port=3000;

app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect("mongodb://localhost:27017/test_dbs", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
});


// SCHEMA
const sch = new Schema({
    title: String,
    budget: Number,
    color: String
}, {
    versionKey: false,
    strict: 'throw'
});

const monmodel=mongoose.model("test_db",sch);

//POST
app.use("/post",async(req,res)=>{
    console.log("inside post function");

    const data=new monmodel({
        title:req.body.title,
        budget:req.body.budget,
        color:req.body.color
    });

    const val=await data.save();
    res.json(val);
})

// Fetch all data
app.get('/fetchall', (req, res) => {
    monmodel.find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('An error occurred while fetching data.');
        });
});

app.get('/budget',(req,res) => {

    fs.readFile("data.json", "utf-8", (err,jsonData) => {

        if (err) {
            console.log("Error reading file:", err);
            return;
        }

        try {
            const budgetData = JSON.parse(jsonData);
            res.json(budgetData);

        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
});

app.listen(port, () =>{

    console.log(`API listening to http://localhost:${port}`);

});