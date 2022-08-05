const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
      name:{
        type: String,
        required: true,
        min: 6
      },
     price:{
        type: number,
        required: true,
        min: 2

     }

});
module.exports = mongoose.model('Product',ProductSchema)