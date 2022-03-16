const router = require('express').Router()
const Customer = require('../models/customerModel')
const auth = require('../middleware/auth')

//* /customer

// **ADD A CUSTOMER
router.post('/', auth, async (req, res) => {
    try {
        const { name } = req.body;

        const newCustomer = new Customer({
            name
        })

        // save new customer in db
        savedCustomer = await newCustomer.save()

        // send back new saved customer obj
        res.json(savedCustomer)
    } catch (err) {
        console.log(err)
        // 500 server error
        res.status(500).send();
    }
})

// *GET ALL CUSTOMERS
router.get('/', auth, async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    } catch (err) {
        console.log(err)
        // 500 server error
        res.status(500).send();
    }
})
module.exports = router