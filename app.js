const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

mongoose.connect("mongodb+srv://nagabhavanibongu:0ulCqzQiEiYEPgFV@todoapp.kgxrvvr.mongodb.net/todo")
.then(()=>console.log("connected to MongoDB"))
.catch(err =>console.error("MongoDB connection error:",err));
const trySchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Task", trySchema);
const todo = new Item({ name: "uday" });
//todo.save();

app.get("/", (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Something Went Wrong");
        });
});

app.post("/", (req, res) => {
    const ItemName = req.body.ele1;
    const todo = new Item({ name: ItemName });
    todo.save();
    res.redirect("/");
});

app.post("/delete", (req, res) => {
  const check = req.body.checkbox1;
  Item.findByIdAndDelete(check)
    .then(() => {
      console.log("Deleted item with id", check);
      res.redirect("/");
    })
    .catch(err => {
      console.error("Error deleting item", err);
      res.status(500).send("Error deleting item");
    });
});

    



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});
