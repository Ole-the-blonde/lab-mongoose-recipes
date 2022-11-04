const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  .then(async () => {
    console.log("Its connected");

    const olesyaRecipe = new Recipe({
      title: "Chicken with potatoes",
      level: "Amateur Chef",
      ingredients: ["chicken", "potatoes", "carrots", "onion"],
      cuisine: "International",
      dishType: "main_course",
    });
    olesyaRecipe.save();

    const allRecipies = await Recipe.create(data);

    for (let recipe of allRecipies) {
    }
    const updateDuration = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log(await Recipe.find({}, { title: 1 }));
  });

await mongoose
  .disconnect()

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// const Recipe = mongoose.model("Recipe", recipeSchema);
