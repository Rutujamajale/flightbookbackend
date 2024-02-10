
const Booking = require('../model/booking.model')


  exports.getBookings = async (req, res) => {
    try {
  
      const booking = await Booking.find();
      
      console.log(booking);
  
      
      res.status(200).json({message:"All Bookings Data", AllBooking: booking });
    } catch (error) {
      res.status(500).json("Error", error.message);
    }
  };

  // Update booking controller
exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const { user, from, to, flight } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { user, from, to, flight },
      { new: true } // to return the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete booking controller
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



