const express = require("express")
const app = express() 
const dotenv = require("dotenv").config() 
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')

const User = require("./models/User")
const Category = require("./models/Category")
const Listing = require("./models/Listing")
const Review = require("./models/Review")

app.use(express.static('public')) 
app.use(express.urlencoded({ extended: false })) 
app.use(methodOverride('_method'))
app.use(morgan('dev'))

async function seedData() {
    try {
        const user = await User.findOneAndUpdate(
            { username: 'zaid' },
            { username: 'zaid', password: '1234' },
            { upsert: true, returnDocument: 'after' }
        )

        const category = await Category.findOneAndUpdate(
            { categoryName: 'Apartment' },
            { categoryName: 'Apartment' },
            { upsert: true, returnDocument: 'after' }
        )

        const existingListing = await Listing.findOne({ streetAddress: 'Road 12', owner: user._id })

        if (!existingListing) {
            await Listing.create({
                streetAddress: 'Road 12',
                city: 'Manama',
                price: 80,
                size: 120,
                owner: user._id,
                category: category._id
            })
        }

        const existingReview = await Review.findOne({ reviewTitle: 'Great stay', creator: user._id })

        if (!existingReview) {
            await Review.create({
                reviewTitle: 'Great stay',
                reviewBody: 'The place was very clean and nice.',
                creator: user._id
            })
        }
    } catch (error) {
        console.log('Seed failed:', error.message)
    }
}

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
        await seedData()
    }
    catch (error) {
        console.log("Error Occured", error)
    }
}

connectToDB()

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
})