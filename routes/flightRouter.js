const express=require('express');
const flightController=require('../controller/flights');
const routers= express.Router();

routers.post('/addFlights', flightController.createFlight);
routers.get('/getAllFlights', flightController.getFlights);
routers.get("/getFlightById/:flightId",flightController.getFlightById);
routers.put("/updateFlight/:id",flightController.updateFlight);
routers.delete("/deleteFlight/:id",flightController.updateFlight);




module.exports=routers;