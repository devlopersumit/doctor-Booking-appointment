const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    specialization: {
        type: String,
        required: [true, 'Doctor must have a specialization']
    },

    experience: {
        type: Number,
        required: [true, 'Please enter experience in years']
    },

    qualifications: {
        type: String,
        required: [true, 'Qualifications are required']
    },

    bio: {
        type: String
    },

    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },

    consultationFee: {
        type: Number,
        default: 0
    },

    profileImage: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
