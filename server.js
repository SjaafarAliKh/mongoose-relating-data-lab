// imports
const express = require("express")
const app = express() 
const dotenv = require("dotenv").config() 
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')

// models
const User = require("./models/User")
const Category = require("./models/Category")
const Listing = require("./models/Listing")
const Review = require("./models/Review")


// Middleware
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: false })) 
app.use(methodOverride('_method'))
app.use(morgan('dev'))


async function connectToDB() { // connection to the database
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}

connectToDB()


// Routes go here

app.get("/", (req, res) => {
    res.redirect("/listings")
})

app.get("/listings", async (req, res) => {
    try {
        const allListings = await Listing.find()
            .populate('owner', 'username') 
            .populate('category')          
        res.json(allListings)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Something went wrong.")
    }
})



app.listen(3000, () => {
    console.log("Listening on port " + 3000)
}) // Listen on port 3000

