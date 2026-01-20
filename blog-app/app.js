const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const flash = require("connect-flash");
const path = require('path');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const uploadRoutes = require('./routes/uploadRoutes');
const app = express();

//mongodb connection
const MONGO_URI=process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog_app";
mongoose.connect(MONGO_URI).then(()=>{
  console.log("Database connection sucessful");
}).catch((err)=>{
  console.log("Error Connectin to the database ",err);
});

require("dotenv").config();


//Settings
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//configuration Middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
  secret: "IVNWETCEGFBXW4KFPZLXA3KQNNCGSUZSLRKXM4DTIVOGQX2UNJMUIRBHORZTGI3SOBDUIW3TGNDTMR2FK45EEURPHY",
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({client: mongoose.connection.getClient(),  // Reuse your existing connection
    collectionName: 'sessions',               // Optional custom collection name
    ttl: 60 * 60 * 24 * 7,                    // 7 days in seconds
  }),
   cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,          // 7 days in ms
  },

}));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user; 
  next();
});

app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.session.user || null;
  next();
});

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));




//Routes
app.use("/", require("./routes/home"));
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/uploads",uploadRoutes);





//Server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT,HOST);
