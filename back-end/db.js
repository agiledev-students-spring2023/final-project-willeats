// import mongoose, { Schema } from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name : {type: String, unique: true, required: true},
    email : {type: String, unique: true, required: [true, "Please provide a email!"]},
    password : {type: String, unique: true, required: [true, "Please provide a password!"]},
    order : [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    review : [{type: Schema.Types.ObjectId, ref: 'Review'}],
    date: { type: Date, default: Date.now },
    avater: {type: String},
});

const RestaurantSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name : {type: String, unique: true, required: true},
    email:{type: String, unique: true, required: true},
    password : {type: String, unique: true, required: [true, "Please provide a password!"]},
    createdate: { type: Date, default: Date.now },

    avatar:{type: String, required:false}, 
    background:{type:String,required:false},   
    deliveryFee: { type: Number, required: true, default: 2.99 }, // reasonable default delivery fee of $2.99
    taxRate: { type: Number, required: true, default: 8.825 } // nyc default tax rate of 8.825%
});


const ReviewSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    itemName: {type: String, required: true},
    dishId: { type: Schema.Types.ObjectId, ref: 'Dish' },
    rating: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    review: {type: String, required: true},
    date: { type: Date, default: Date.now },

    image:[{type:String}],
    reply:{type:String, required:false}

})

const DishSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name:{
      type:String,
      required:true
    },
    restaurant :{
        type:Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    type:{
        type: String,
        required: true
    },
    photo: {type: String,
      required: false},
    description: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    review: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]
  });

  const OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref:'User'},
    restaurant :{
        type:Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    totalPrice:{
        type: Number,
        required: true
    },
    dish: [{type: Schema.Types.ObjectId, ref: 'Dish'}],
    date: { type: Date, default: Date.now },
  })

  const Restaurant = mongoose.model('Restaurant',RestaurantSchema);
  const Dish = mongoose.model('Dish',DishSchema);
  const User = mongoose.model('User', UserSchema);
  const Review = mongoose.model('Review', ReviewSchema);
  const Order = mongoose.model('Order', OrderSchema)
  mongoose.connect("mongodb+srv://ljr:123123123@cluster0.tmtz8nv.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
});

module.exports = { User, Review, Dish, Restaurant, Order };