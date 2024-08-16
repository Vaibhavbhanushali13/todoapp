var Express = require("express");
var MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());
  
var CONNECTION_STRING = "mongodb+srv://bhanushalivaibhav:Jahra1IPOpMnXp1Z@cluster0.qiaq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DatabaseName = "todoappdb";
var database;

app.listen(5038, ()=>{
    MongoClient.connect(CONNECTION_STRING,(error, client)=>{
        database = client.db(DatabaseName);
        console.log("mongodb connection successed");
        
    })
})

app.get('/api/todoapp/GetNotes',(request, response) =>{
    database.collection('todoappcollection').find({}).toArray((error, result) =>{
        response.send(result);
    });
})

app.post('/api/todoapp/AddNotes',multer().none(),(request, response) =>{
    database.collection('todoappcollection').count((error, numOfDocs) => {
        console.log(request.body);
        database.collection('todoappcollection').insertOne({
            id:(numOfDocs+1).toString(),
            description : request.body.newNotes
        });
        response.json("Added Successfully");
    })
})

app.delete('/api/todoapp/DeleteNotes',(request, response) => {
    database.collection('todoappcollection').deleteOne({
        id : request.query.id
    })
    response.json("Deleted Successfully");
})