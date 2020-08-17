const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    product:{
        type: String,
        required: [true, 'product field is required']
    },
    quantity:{
        type: Number
    },
    quantityType:{
        type: String
    }
});

const ShoppingListSchema = new Schema({
    products: [ItemSchema]
});

const ShoppingList = mongoose.model('shoppinglist', ShoppingListSchema);
module.exports = ShoppingList;