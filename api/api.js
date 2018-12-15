const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ratemydog');

const Dogs = require('./models/Dog')

const app = new express();
const port = process.env.PORT || 5000;
const url = 'http://localhost:';

app.use(express.json())//to access the body of the request
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/", (req, res) => {
    return res.send('Welcome to Rate My Dog! Get rating :D')
});

app.get("/dogs", (req, res) => {
    Dogs.find({})
        .then(docs => res.send(docs));
});

app.get("/dogs/:id", (req, res) => {
    const { id } = req.params
    Dogs.findOne({_id: id})
        .then(doc => res.send(doc));
});

app.post("/dogs", (req, res) => {
    const { name, description, image } = req.body;
    const dog = new Dogs({
        _id: new mongoose.Types.ObjectId(), name, rating: [], description, image
    });
    dog.save()
        .then(doc => res.send(doc));
});

app.put("/dogs/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, image } = req.body;

    Dogs.findOneAndUpdate({_id: id}, { name, description, image}, {new: true, runValidators: true})
        .then(doc => res.send(doc));
});

app.delete("/dogs/:id", (req, res) => {
    const { id } = req.params;
    Dogs.findOneAndRemove({_id: id})
        .then(doc => res.send(doc));
});

app.listen(port, () => {
    console.log(`listening at ${url}${port}`)
});