//Require Mongose package
const mongoose = require('mongoose');

//Connection Url AND Create DB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

//Inset Data to database | structure of data using schema
//Adding Data Validation to name field
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please check your data entry no name specified."]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

//Use shema to create mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);
//Create new Record fruits 
const fruit = new Fruit({
    // name: "Apple",
    rating: 10,
    review: "Peaches are so yummy!"
});

//add Many Fruits | B U L K
// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "The Best fruit!"
// });
// const orange = new Fruit({
//     name: "orange",
//     score: 4,
//     review: "Too sour for me"
// });
// const banana = new Fruit({
//     name: "banana",
//     score: 3,
//     review: "Weired texture"
// });

//Save document to fruits collection in fruitsDB
// fruit.save();

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully Save to FruitsDB");
//     }
// });


//Create new Collection of People
//Establishing relationship and Embedding documents
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favorateFruit: fruitSchema
});

//Create Model
const Person = mongoose.model("Person", personSchema);
//Create a fruit for Embedding to person
const mango = new Fruit({
    name: "mango",
    score: 6,
    review: "Decent fruit."
});

mango.save();
//Update Person to add FruitFavorate field
Person.updateOne({ _id: "63e7901dbcdac87e302d4874" }, { favorateFruit: mango }, function (err) {
    if (err) {
        console.log(err)
    } else {
        console.log("Successfully Updated the document.");
    }
});

//Create a new Person
// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favorateFruit: pineapple
// });
//save to database
// person.save();



//READ TO  DATABASE
Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        //Close Connection after code exucution
        mongoose.connection.close();
        //Loop to fruits JSON
        fruits.forEach(function (fruit) {
            //Display the name of the fruits
            console.log(fruit.name);
        });
    }
});


//UPDATE TO DATABASE
// Fruit.updateOne({ _id: "63e6f51f68b29ad8b0e97be7" }, { name: "Peach" }, function (err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("Successfully Updated the document.");
//     }
// });


//DELETE RECORD TO DATABASE
// Fruit.deleteOne({ _id: "63e6f51f68b29ad8b0e97be7" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully Deleted in Database.");
//     }
// });

//DELETE MANY
// Person.deleteMany({ name: "Reynand" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Succesfully Deleted all the document.");
//     }
// });








//Validation to Database Connection
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected"));