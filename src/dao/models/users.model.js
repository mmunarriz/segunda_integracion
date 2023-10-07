import mongoose from 'mongoose';

const collection = 'users';

const schema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        default: "user"
    },
})

const userModel = mongoose.model(collection, schema);

export default userModel;