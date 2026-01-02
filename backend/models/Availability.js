const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema(
{
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },

    dayOfWeek: {
        type: Number,
        min: 0, 
        max: 6, 
        required: true
    },

    startTime: {
        type: String,
        required: true
    },

    endTime: {
        type: String, 
        required: true
    },

    isAvailable: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

availabilitySchema.pre('save', function (next) {
    if (this.startTime >= this.endTime) {
        return next(new Error('endTime must be greater than startTime'));
    }
    next();
});

module.exports = mongoose.model('Availability', availabilitySchema);
