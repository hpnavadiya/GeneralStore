const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(
    cors({
        origin: ["http://localhost:3000", "http://GeneralStore.vercel.app"],
        credentials: true,
    })
);

// Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000; 

// Mongodb connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT} Port`)
    })
}).catch((err)=> console.log(err));

// Routes
app.get("/", (req, res) => {
    res.send("Home Page....")
})

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);