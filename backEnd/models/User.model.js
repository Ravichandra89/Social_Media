import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    pictureUrl: {
        type: String, // Url From S3
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    viewedProfile: {
        type: Number,
    },
    location: String,
    occupation: String,
    impressions: Number,
},
{timestamp: true}
)

const User = mongoose.model("User", userSchema);
export default User;

