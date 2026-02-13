const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const products = require("./data/products");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);


// Function to seed Data

const seedData = async () => {
    try{

        // Clear Existing Data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // Create a Default Admin User
        const createdUSer = await User.create({
            name : "Admin User",
            email : "admin@example.com",
            password : "123456",
            role : "admin",
        });

        // Assign the Default user id to each product
        const userID = createdUSer._id;

        const sampleProducts = products.map((product)=>{
            return { ...product, user : userID};
        });

        // Insert the product into database
        await Product.insertMany(sampleProducts);

        console.log("Product data seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Error sending the data");
        process.exit(1);
    }
};


seedData();