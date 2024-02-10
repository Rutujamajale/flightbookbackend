

const Flight = require('../model/flight.model');

// Create a new flight
exports.createFlight = async (req, res) => {
  try {
    const { airLine, flightNo, price}=req.body;

const flight = new Flight({airLine,flightNo, price});
    await flight.save();
    res.status(201).json({ message:"Flight added successfully", data: flight });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all flights
exports.getFlights = async (req, res) => {
  try {

    const flights = await Flight.find();
    console.log(flights);
    
    res.status(200).json({message:"All Flights Data", AllFlights: flights });
  } catch (error) {
    res.status(500).json("Error", error.message);
  }
};

// Get a single flight by ID
exports.getFlightById = async (req, res) => {
  try {
    const {flightId} = req.params;
    console.log("flightId",flightId);
    const flight = await Flight.findById({_id:flightId});
    if (!flight) {
      return res.status(404).json({ success: false, error: 'Flight not found' });
    }
    console.log("flight",flight);
    res.status(200).json({ message:"getting flight", data: flight });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a flight by ID
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!flight) {
      return res.status(404).json({ success: false, error: 'Flight not found' });
    }
    res.status(200).json({ message:"flight Edit Sucessfully.", data: flight });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a flight by ID
exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, error: 'Flight not found' });
    }
    res.status(200).json({ message:"flight Deleted Sucessfully", data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

