const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

let tasks = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = []; 

const app = express();
// Setting EJS as the view engine
app.set('view engine', "ejs");

// Serving static files from the public directory
app.use(express.static("public"));

// Using bodyParser middleware to parse request bodies
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    // var today = new Date();

    // var options = {
    //     weekday : "long",
    //     day : "numeric",
    //     month : "long"
    // };

    // var day = today.toLocaleDateString("en-US", options);

    let day = date.getDate();


    // Rendering the list template with the day's title and the task list
    res.render("list", {
        listTitle: day,
        newListItems : tasks
    });
});


// app.post("/", function(req, res){
//     var task = req.body.newItem;
//     tasks.push(task);

//     res.redirect("/");

// })



app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems})
});


app.post("/", function(req, res){
    let item = req.body.newItem;

    // Checking which list the item should be added to
    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        tasks.push(item);
        res.redirect("/");
    }
    
})



app.listen(3000, function(){
    console.log("server created")
});