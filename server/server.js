require("dotenv").config();
const express = require ("express");
const app = express();
require("./db/conn");
const authRouter = require("./routes/auth-route");
const categoryRoutes = require("./routes/category-route");
const placeRoutes = require("./routes/place-route")
const formidable = require("express-formidable");
const cors = require("cors");

const port = process.env.PORT;

const corsOptions = {
    origin: ["*"],
    methods: "GET, POST, PUT, DELETE, HEAD",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/v1/category", categoryRoutes);
app.use(formidable());
app.use("/api/v1/place", placeRoutes);

app.get("/", (req, res)=>{
    res.send("home");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
