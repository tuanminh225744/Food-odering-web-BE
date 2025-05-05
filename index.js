const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
var bodyParser = require('body-parser');
const morgan = require('morgan');
const foodRouter = require('./routes/food.js');
const cartRouter = require('./routes/cart.js');
const customerRouter = require('./routes/customer.js');
const orderRouter = require('./routes/order.js'); // Đảm bảo đường dẫn chính xác

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(morgan("common"));

// Routes
app.use('/api/food', foodRouter);
app.use('/api/cart', cartRouter);
app.use('/api/customer', customerRouter);
app.use('/api/order', orderRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});


