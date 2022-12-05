// jshin esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");
// 
// const MongoStore = require("connect-mongo")(session);
const MongoStore = require('connect-mongo');
// 
const passportLocalMongoose = require("passport-local-mongoose");
var cart = require("./models/cart");


const app = express();


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

const url = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.5dwjppa.mongodb.net/test`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
  
// 
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: url}),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);
// 

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){ // I CAN ACCESS THIS VARIEBLES IN ALL THE VIEWS
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

// 
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const productSchema = {
  name: String,
  image: String,
  price: Number,
  description: String,
  rating: Number,
};

const CoffeeProduct = mongoose.model("CoffeeProduct", productSchema);
const MachineProduct = mongoose.model("Machine", productSchema);
const AllProduct = mongoose.model("Product", productSchema);

const product1 = new CoffeeProduct({
  name: "Peru San Fernando",
  image: "1",
  price: 65,
  description: `Producer: Cooperativa Incahauasi \n \
   250 gr \n \
  Processing: Natural.
  Varietal: Caturra, Bourbon
  Notes: red apple, caramel, dried fig, roasted nut.
  Very good for filter coffee, but it can be also used for espresso and others.Roasted by Fluid Speciality Coffee.`,
  rating: 4.5,
});
const product2 = new CoffeeProduct({
  name: "Espresso Blend",
  image: "2",
  price: 60,
  description:
    "Espresso Blend \n 250 gr \n Ethiopia  Yirgacheffe Wonago & Guatemala Santa Rita \n Notes: honey, black tea, cocoa. \n Roasted in Bucharest by Fluid Speciality Coffee.",
});
const product3 = new CoffeeProduct({
  name: "Ethiopia Simageamo Haile",
  image: "3",
  price: 60,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});
const product4 = new CoffeeProduct({
  name: "Ethiopia Yirgacheffe",
  image: "4",
  price: 60,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});
const product5 = new CoffeeProduct({
  name: "Guatemala Santa Rita",
  image: "5",
  price: 60,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});
const product6 = new CoffeeProduct({
  name: "Colombia Maritza Penna",
  image: "6",
  price: 60,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});
const product7 = new CoffeeProduct({
  name: "Peru San Jose De Lourdes",
  image: "7",
  price: 60,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});

const machine1 = new CoffeeProduct({
  name: "Aero Press",
  image: "AeroPress",
  price: 65,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});
const machine2 = new CoffeeProduct({
  name: "French Press",
  image: "French_press",
  price: 65,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});
const machine3 = new CoffeeProduct({
  name: "Hario v60",
  image: "Hario_v60",
  price: 65,
  description:
    "Processing: Natural \n Varietal: Caturra, Bourbon \n Notes: red apple, caramel, dried fig, roasted nut. \n Very good for filter coffee, but it can be also used for espresso and others. \n Roasted by Fluimage Speciality Coffee.",
});

const defaultCoffeeItems = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
];
const defaultMachineItems = [machine1, machine2, machine3];
const defaultAllProducts = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  machine1,
  machine2,
  machine3,
];

app.get("/", function (req, res) {
  var email;
  if(req.isAuthenticated()){
    email = req.user.username;
  }
  res.render("home", {
    newListItems: defaultCoffeeItems,
    machinesItems: defaultMachineItems,
    isLoggedIn: req.isAuthenticated(),
    email: email,
  });
});


app.get("/produse", function (req, res) {
  var email;
  if(req.isAuthenticated()){
    email = req.user.username;
  }
  res.render("produse", { produse: defaultAllProducts,    isLoggedIn: req.isAuthenticated(),
    email: email, });
});

app.get("/meniu", function (req, res) {
  var email;
  if(req.isAuthenticated()){
    email = req.user.username;
  }
  res.render("meniu", {isLoggedIn: req.isAuthenticated(),email: email, });
});

app.get("/products/:postName", function (req, res) {
  var email;
  if(req.isAuthenticated()){
    email = req.user.username;
  }
  const requestedPostName = req.params.postName;
  AllProduct.findOne({ name: requestedPostName }, function (err, product) {
    if (err) {
      console.log(err);
    } else {
      res.render("produs", { produs: product, items: defaultAllProducts, isLoggedIn: req.isAuthenticated(),email: email, });
    }
  });
});

app.get("/register", function (req, res) {
  var email;
  if(req.isAuthenticated()){
    email = req.user.username;
  }
  res.render("register", {isLoggedIn: req.isAuthenticated(), email: email,});
});
app.get("/login", function (req, res) {
  var email;
  if(req.isAuthenticated()){
    email = req.user.username;
  } 
  res.render("login", {isLoggedIn: req.isAuthenticated(),email: email,});
});

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(user, function(err){
    if(err){
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  })

});

app.get("/logout", function(req, res){
  req.logout(function(err){
    if(err) {console.log(err);}
    else{
    res.redirect("/");
    }
  });
})


app.get("/cart", function(req, res) {
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    // res.render("cart");
    res.send("Salut");
  } else {
    res.redirect("/register");
  }
});

app.post("/cumpara", function(req, res){
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    console.log(req.body);
  } else {
    res.redirect("/register");
  }
})

app.get('/add-to-cart/:name', function(req, res){
  var productName = req.params.name;
  var Cart = new cart(req.session.cart ? req.session.cart : {});

  AllProduct.findOne({name: productName}, function(err, product) {
    if(err) {
      return res.redirect('/');
    } else {
      Cart.add(product, product.name);
      req.session.cart = Cart;
      console.log(Cart);
      res.redirect(`/products/${productName}`);
    }
  })
});

const PORT = 3000;
app.listen(process.env.PORT || PORT, function () {
  console.log("SERVER STARTED PORT: 3000");
});
