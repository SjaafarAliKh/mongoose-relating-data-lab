require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Category = require('./models/Category')
const Listing = require('./models/Listing')

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)

        const user = await User.create({ username: 'zaid', password: '1234' })
        const category = await Category.create({ categoryName: 'Apartment' })

        await Listing.create({
            streetAddress: 'Road 12',
            city: 'Manama',
            price: 80,
            size: 120,
            owner: user._id,
            category: category._id
        })

        // Without populate: owner and category are only ids
        console.log('--- WITHOUT POPULATE ---')
        console.log(await Listing.find())

        // With populate: ids are replaced by documents (username only, never the password)
        console.log('--- WITH POPULATE ---')
        console.log(await Listing.find().populate('owner', 'username').populate('category'))
    }
    catch (error) {
        console.log('Seed failed:', error.message)
    }

    await mongoose.connection.close()
}

seed()