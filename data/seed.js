const mongoose = require('mongoose');
require('dotenv').config()      

const CoffeeModel = require('../models/coffee')
const coffeeMockData = require('./coffees')

/**
 *  Be careful this command line delete all coffee data and add mock data in the DB. 
 *  Therefore only must use to add mock data in DB.
 *
    node ./data/seed.js
 */
async function seedCoffee() {
    try {
        await mongoose.connect(process.env.MONGO_URI)    

        // Clear existing coffee data
        await CoffeeModel.deleteMany({});
        console.log('Existing coffee data cleared');

        // Insert new coffee data
        await CoffeeModel.insertMany(coffeeMockData);
        console.log('Coffee data seeded successfully');

        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('Error seeding coffee data:', error);
        process.exit(1); // Exit with failure
    }
}

// Run the seed function
seedCoffee();
