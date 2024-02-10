
const express = require('express');
const router = express.Router();
const userController = require('../controller/User');
const authenticateUser = require('../middlware/authentcion.middleware');

// Create a new user
router.post('/addUser', userController.registerUser);
router.post('/loginUser',userController.loginUser);
router.get("/loginUserbyId/:id",userController.getUserById);




// Get all users
// router.get('/getUser', userController.getAllUsers);

// // Get user by ID
// router.get('/getUserId/:id', userController.getUserById);

// // Update user by ID
// router.put('updateUser/:id', userController.updateUserById);

// // Delete user by ID
// router.delete('deleteUser/:id', userController.deleteUserById);

module.exports = router;

