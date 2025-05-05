const { Food, Order, Customer, Cart } = require('../model/model.js');
const router = require('express').Router();

const customerController = {
    // Lấy tất cả khách hàng
    getAllCustomers: async (req, res) => {
        try {
            const customers = await Customer.find().populate('cartId').populate('orders.foodId');
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy khách hàng theo ID
    getCustomerById: async (req, res) => {
        try {
            const customer = await Customer.findById(req.params.id).populate('cartId').populate('orders.foodId');
            if (!customer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Tạo khách hàng mới
    createCustomer: async (req, res) => {
        const customer = new Customer({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            cartId: req.body.cartId,
            orders: req.body.orders,
        });

        try {
            const savedCustomer = await customer.save();
            res.status(201).json(savedCustomer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Cập nhật khách hàng
    updateCustomer: async (req, res) => {
        try {
            const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('cartId').populate('orders.foodId');
            if (!updatedCustomer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json(updatedCustomer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa khách hàng
    deleteCustomer: async (req, res) => {
        try {
            const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
            if (!deletedCustomer) return res.status(404).json({ message: 'Customer not found' });
            res.status(200).json({ message: 'Customer deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = customerController;