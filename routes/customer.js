const router = require('express').Router();
const customerController = require('../controller/customerController.js');


// Lấy tất cả khách hàng
router.get('/', customerController.getAllCustomers);

// Lấy khách hàng theo ID
router.get('/:id', customerController.getCustomerById);

// Tạo khách hàng mới
router.post('/', customerController.createCustomer);

// Cập nhật khách hàng
router.put('/:id', customerController.updateCustomer);

// Xóa khách hàng
router.delete('/:id', customerController.deleteCustomer);


module.exports = router;