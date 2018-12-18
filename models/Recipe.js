const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    ingredients: Array,
    recipe: String,
    image: String
});

module.exports = mongoose.model('Recipe', recipeSchema);