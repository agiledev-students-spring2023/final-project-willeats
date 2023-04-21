import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username : {type: String, unique: true, required: true},
    email : {type: String, unique: true, required: [true, "Please provide a email!"]},
    password : {type: String, unique: true, required: [true, "Please provide a password!"]},
    order : [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    review : [{type: Schema.Types.ObjectId, ref: 'Review'}],
    date: { type: Date, default: Date.now },
    avater: {type: Buffer},

});

const reviewSchema = new Schema({
    _id: Schema.Types.ObjectId,
    itemName: {type: String, required: true},
    dishId: { type: Schema.Types.ObjectId, ref: 'Dish' },
    rating: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    review: {type: String, required: true},
    date: { type: Date, default: Date.now },
    image:[{type: Schema.Types.ObjectId, ref: 'ReviewImage'}]
})




















