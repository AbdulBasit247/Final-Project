const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to MogoDB
connectDB();

app.get('/', (req,res) => {
    res.send("Hello");
});



// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoutes);


// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

 

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});



// ab0565461_db_user
// A5QoHGKxySc4I5l8


// MONGO_URI=mongodb+srv://ab0565461_db_user:A5QoHGKxySc4I5l8@cluster0.thgogmo.mongodb.net/rabbit?appName=Cluster0


// RbT9mX7KQ4P2L8vE



// MONGO_URI=mongodb://ab0565461_db_user:RbT9mX7KQ4P2L8vE@cluster0-shard-00-00.thgogmo.mongodb.net:27017,cluster0-shard-00-01.thgogmo.mongodb.net:27017,cluster0-shard-00-02.thgogmo.mongodb.net:27017/rabbit?ssl=true&authSource=admin