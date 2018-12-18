const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/myrecipe');

const Recipes = require('./models/Recipe')

const app = new express()
const port = process.env.PORT || 5000;
const url = 'http://localhost:'

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
    return res.send('Welcome to My recipes!')
})

app.get("/recipes", (req, res) => {
    Recipes.find({})
        .then(docs => res.send(docs));
});

app.get("/recipes/:id", (req, res) => {
    const { id } = req.params
    Recipes.findOne({_id: id})
        .then(doc => res.send(doc));
});

app.post("/recipes", (req, res) => {
    const { title, ingredients, recipe, image } = req.body;
    const arecipe = new Recipes({
        _id: new mongoose.Types.ObjectId(), title, ingredients, recipe, image
    });
    arecipe.save()
        .then(doc => res.send(doc));
});

app.put("/recipes/:id", (req, res) => {
    const { id } = req.params;
    const { title, ingredients, recipe, image } = req.body;

    Recipes.findOneAndUpdate({_id: id}, { title, ingredients, recipe, image}, {new: true, runValidators: true})
        .then(doc => res.send(doc));
});

app.delete("/recipes/:id", (req, res) => {
    const { id } = req.params;
    Recipes.findOneAndRemove({_id: id})
        .then(doc => res.send(doc));
});

app.listen(port, () => {
    console.log(`listening at ${url}${port}`)
})