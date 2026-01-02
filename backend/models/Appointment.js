const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    date:{
        type:Date,
        required:[true, 'Appointment date is required']
    },
    time:{
        type:Date,
        required:[true, 'Appointment time is required']
    },
    status:{
        type:String,
        enum:['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default:'Pending'
    },
    notes:{
        type:String
    },
    prescription:{
        type:String
    }
}, {
    timestamps:true
});

module.exports = mongoose.model('Appointment', appointmentSchema);