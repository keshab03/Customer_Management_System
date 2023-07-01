const Customer = require('../models/Customer');



// Get all employees
const getAll = async (req, res) => {

  try {

    const customer = await Customer.find().sort({ createdAt: -1 });
    res.status(200).json({ customer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get an employee by ID
const getById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Create a new employee
const create = async (req, res) => {
  try {
    const { name, address, due, extra } = req.body;


    const customer = new Customer({ name, address, due, extra });
    await customer.save();
    res.status(201).json({ message: 'Customer created successfully', customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update an employee by ID
const updateById = async (req, res) => {
  try {

    const { name, address, due, extra } = req.body;

    const customerupdate = {
      name, address, due, extra
    };

    const customer = await Customer.findByIdAndUpdate(req.params.id, customerupdate, { new: true });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully', customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete an employee by ID
const deleteById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getAll, getById, create, updateById, deleteById }

