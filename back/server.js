require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./app/routes/index");
const routerAdmin = require("./admin/app/routes/admin");


const errorMiddleware = require("./middlewares/error.middleware");
//setting DB
const PORT = process.env.SERVER_PORT || 8080;
const APP_URL = process.env.APP_URL;
const DB_NAME = process.env.DB_NAME;
const DB_URL = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + (process.env.NODE_ENV === "dev" ? process.env.DB_URL_DEV : process.env.DB_URL_PROD) + ":27017/" + DB_NAME;
mongoose.set("strictQuery", false);

const corsOptions = {
  credentials: true,
  origin: [APP_URL + ":3000", APP_URL + ":5555"]
};
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/uploads", express.static("uploads"));
app.use("/api/v1", router);
app.use("/api/v1/admin", routerAdmin);
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
if (process.env.NODE_ENV === "dev") {
  app.use("/swagger", require("./helpers/swager"));
}

app.use(errorMiddleware);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT ", PORT, process.env.NODE_ENV));
  } catch (e) {
    console.log("error", e);
  }
}

startApp().then();