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
    avater: {type: Buffer},
});

<<<<<<< HEAD
=======
const RestaurantSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name : {type: String, unique: true, required: true},
    email:{type: String, unique: true, required: true},
    password : {type: String, unique: true, required: [true, "Please provide a password!"]},
    createdate: { type: Date, default: Date.now },
    avatar:{type: Buffer},    
})

>>>>>>> 4e15b87cf2f3f690d2d748937bb86fcc8262d19f
const ReviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    itemName: {type: String, required: true},
    dishId: { type: Schema.Types.ObjectId, ref: 'Dish' },
    rating: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    review: {type: String, required: true},
    date: { type: Date, default: Date.now },
    image:[{type: Schema.Types.ObjectId, ref: 'ReviewImage'}]
})

<<<<<<< HEAD
const RestaurantSchema = new Schema({
    // _id: Schema.Types.ObjectId,
    name : {type: String, unique: true, required: true},
    email:{type: String, unique: true, required: true},
    password : {type: String, unique: true, required: [true, "Please provide a password!"]},
    createdate: { type: Date, default: Date.now },
    avatar:{type: Buffer},    
})
=======
>>>>>>> 4e15b87cf2f3f690d2d748937bb86fcc8262d19f
const DishSchema = new Schema({
    _id: Schema.Types.ObjectId,
    restaurant :{
        type:Schema.Types.ObjectId,
        ref: 'restaurant'
    },
    photo: {
      type: Buffer,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    review: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]
  });

  const Restaurant = mongoose.model('Restaurant',RestaurantSchema);
  const Dish = mongoose.model('Dish',DishSchema);
  const User = mongoose.model('User', UserSchema);
  const Review = mongoose.model('Review', ReviewSchema);
  mongoose.connect("mongodb+srv://ljr:123123123@cluster0.tmtz8nv.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser: true,
});

module.exports = { User, Review, Dish, Restaurant };
<<<<<<< HEAD



=======
>>>>>>> 4e15b87cf2f3f690d2d748937bb86fcc8262d19f

















