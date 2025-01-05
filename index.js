const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const path = require("path");
const mongoose = require("mongoose");
const albumRoutes = require("./routes/album.routes");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost/phototeque");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.get("/", (req, res) => {
  res.redirect("/albums");
});

app.use("/", albumRoutes);

app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.send("Erreur interne du serveur");
});

app.listen(port, () => {
  console.log("Application lancée sur le port 3000");
});
