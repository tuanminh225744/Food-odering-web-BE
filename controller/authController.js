const User = require('../models/model.js').User;
const bcrypt = require('bcrypt');

const authController = {
    // Đăng ký người dùng mới
    register: async (req, res) => {
        try {
            console.log('Request body:', req.body); // Log dữ liệu nhận được từ client

            // Kiểm tra dữ liệu đầu vào
            if (!req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json({ message: 'Missing required fields' });
            }

            // Hash mật khẩu
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // Tạo người dùng mới
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            console.log('New user:', newUser); // Log thông tin người dùng mới

            // Lưu người dùng vào cơ sở dữ liệu
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Đăng nhập
    login: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(404).json('User not found!');
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordValid) return res.status(400).json('Wrong password!');
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = authController;