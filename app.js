//Require Mongose package
const mongoose = require('mongoose');

//Connection Url AND Create DB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

//Inset Data to database | structure of data using schema
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

//Use shema to create mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);
//Create Model
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty Solid as a fruit."
});
//Save document to fruits collection in fruitsDB
// fruit.save();

//Create new Collection of People
const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
});

//Create Model
const Person = mongoose.model("Person", peopleSchema);

//Create a new Person
const person = new Person({
    name: "Reynand",
    age: 21
});
//save to database
// person.save();






//Validation to Database
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected"));