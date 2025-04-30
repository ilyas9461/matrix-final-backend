const CoffeeModel = require('../models/coffee')

/** addCoffee

     {
      name: "Ethiopian Yirgacheffe",
      description: "Floral and citrusy Single Origin coffee from Ethiopia.",
      price: 14.99,
      imageUrl: "",
      rating: 4.9,
      bestSeller: true,
      category: "Single Origin"
    }

 */

const addCoffee = (req, res) => {
    const { ...coffee } = req.body;
    if (coffee) {
        new CoffeeModel(coffee).save()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    } else {
        return res.status(400).send({ error: 'No coffee data.' });
    }
};

const getBestSellers = (req, res) => {
    CoffeeModel.find({ bestSeller: true })
        .then(data => {
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: 'No best sellers found.' });
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Error retrieving best sellers', details: err });
        });
};

const getAllCoffees = (req, res) => {
    CoffeeModel.find({})
        .then(data => {
            if (data.length > 0) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: 'No coffees found.' });
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Error retrieving coffees', details: err });
        });
};

const deleteCoffee = (req, res) => {
    const { ..._id } = req.params; // Extract the _id from the request parameters

    CoffeeModel.findByIdAndDelete(_id)
        .then(data => {
            if (data) {
                res.status(200).send({ message: 'Coffee deleted successfully', data });
            } else {
                res.status(404).send({ error: 'Coffee not found' });
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Error deleting coffee', details: err });
        });
};

const updateCoffee = (req, res) => {
    const { ..._id } = req.params;
    const updateData = req.body;

    CoffeeModel.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true })
        .then(data => {
            if (data) {
                res.status(200).send({ message: 'Coffee updated successfully', data });
            } else {
                res.status(404).send({ error: 'Coffee not found' });
            }
        })
        .catch(err => {
            res.status(500).send({ error: 'Error updating coffee', details: err });
        });
};

module.exports = {
    addCoffee,
    getBestSellers,
    getAllCoffees,
    deleteCoffee,
    updateCoffee
};