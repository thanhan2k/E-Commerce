const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
        },
        quantity: {
            type: Number,
            default: 0,
        },
        sold: {
            // số hàng đã bán
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
        },
        color: {
            type: String,
            enum: ['Black', 'Grown', 'Red'],
        },
        ratings: [
            // đánh giá
            {
                star: { type: Number }, // sao đánh giá
                postedBy: { type: mongoose.Types.ObjectId, ref: 'User' }, // id người đánh giá
                comment: { type: String },
            },
        ],
        totalRatings: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Product', productSchema);
