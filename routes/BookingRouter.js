const express = require('express');
const BookingController=require("../controller/Booking")
const authenticate=require('../middlware/authentcion.middleware')

const router = express.Router();

router.get('/getBookings',BookingController.getBookings)
router.put('/updateBookings/:id',BookingController.updateBooking);
router.delete('/deleteBookings/:id',BookingController.deleteBooking)

// // Create a new booking
// router.post('/Addbookings', BookingController.createBooking);

// // Get all bookings
// router.get('/Getbookings', BookingController.getBookings);

// // Get a single booking by ID
// router.get('/GetByIdBookings/:id', BookingController.getBookingById);

// // Update a booking by ID
// router.put('/UdateBookings/:id', BookingController.updateBooking);

// // Delete a booking by ID
// router.delete('/DeteleBookings/:id', BookingController.deleteBooking);

module.exports = router;
