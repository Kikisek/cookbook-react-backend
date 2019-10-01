const express = require ('express');
const app = express();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/recipes');

let RecipeSchema = new Schema({
  title: {
    en: String,
    cs: String
  },
  image: String,
  ingredients: [
      {
          name:  {
            en: String,
            cs: String
          },
          amount: Number,
          unit: {
            en: String,
            cs: String
          }
      }
  ],
  directions: {
    en: [String],
    cs: [String]
  },
  servings: Number,
  prepTime: Number,
  cookingTime: Number,
  author: {
      id: {
          type: mongoose.Schema.Types.ObjectId,
          rel: 'User'
      },
      username: String
  }
});

let Recipe = mongoose.model('Recipe', RecipeSchema);

app.get('/', (req, res) => {
  res.redirect('/recipes');
});

app.get('/recipes', function (req, res) {
  Recipe.find({}, function (err, recipes) {
    err ? console.log(err) : res.json(recipes);
  })
});

// start the DB locally: mongod
app.listen(8080, () =>
  console.log('Example app listening on port 8080!'),
);