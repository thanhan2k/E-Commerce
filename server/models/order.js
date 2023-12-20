const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Types.ObjectId, ref: 'Product' },
            count: Number,
            color: String,
        },
    ],
    status: {
        // trạng thái đơn hàng
        type: String,
        default: 'Processing', // đang xử lí
        enum: ['Cancelled', 'Proccessing', 'Successed'], //hủy, đang xử lí, thành công
    },
    paymentIntent: {},
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);
