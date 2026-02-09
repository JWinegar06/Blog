require("dotenv").config();

const dns = require("node:dns/promises");
dns.setServers(["8.8.8.8"]);

const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo").default;
const expressLayouts = require("express-ejs-layouts");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

const methodOverride = require("method-override");
const session = require("express-session");

const connectDB = require("./server/config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    // cookie: {maxAge:new Date(Date.now() + 3600000)}
    //Date.now() - 30 * 24 * 60 * 60 * 1000
  }),
);

app.use(expressLayouts);
app.use(express.static("public"));
app.set("layout", "layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
