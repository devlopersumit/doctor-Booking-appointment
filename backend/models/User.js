const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        lowercase: true,
        trim: true,
        minLength: [3, 'name length must be between 3 - 30 characters'],
        maxLength: [30, 'name length must be between 3 - 30 characters']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        index:true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email'
        }
    },
    password: {
        type: String,
        trim:true,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        maxLength: [100, 'Password must not exceed 100 characters'] 
    },
    role: {
        type: String,
        enum: ['Patient', 'Doctor'],
        required:[true, "Role is required"],
        default:'Patient'
    },
    phone: {
        type: String,
        trim:true,
        required: [true, 'Phone number is required'],
        minLength: [10, 'Phone number must be exactly 10 digits'],
        maxLength: [10, 'Phone number must be exactly 10 digits'],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Phone number must contain only digits'
        }
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);  // Salt rounds = 12
    next();
});

module.exports = mongoose.model('User', userSchema);