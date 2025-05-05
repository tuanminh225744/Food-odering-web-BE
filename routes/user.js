const router = require('express').Router();
const userController = require('../controller/userController.js');

// Lấy tất cả người dùng
router.get('/', userController.getAllUsers);

// Lấy người dùng theo ID
router.get('/:id', userController.getUserById);

// Tạo người dùng mới
router.post('/', userController.createUser);

// Cập nhật người dùng
router.put('/:id', userController.updateUser);

// Xóa người dùng
router.delete('/:id', userController.deleteUser);

module.exports = router;