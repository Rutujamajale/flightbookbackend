
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.String,
        ref: "User",
        
    },
    from: {
        type: String,  
        required: true
    },
    to: {
        type: String, 
        required: true
    },
    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flight"
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
