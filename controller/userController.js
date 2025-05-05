const { Food, Order, User, Cart } = require('../models/model.js');

const userController = {
    // Lấy tất cả người dùng
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find().populate('cartId').populate('orders.foodId');
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy người dùng theo ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('cartId').populate('orders.foodId');
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Tạo người dùng mới
    createUser: async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            cartId: req.body.cartId,
            orders: req.body.orders,
        });

        try {
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Cập nhật người dùng
    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('cartId').populate('orders.foodId');
            if (!updatedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Xóa người dùng
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) return res.status(404).json({ message: 'User not found' });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = userController;