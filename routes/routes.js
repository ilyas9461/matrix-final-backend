const router = require('express').Router();
const { getAllUsers, addUser, deleteUser,updateUser, login, logout } = require('../controllers/user-controller')
const {addCoffee, getBestSellers, deleteCoffee, updateCoffee,getAllCoffees} = require('../controllers/coffee-controller')
const verifyJWT =require('../auth/auth')

router.get('/', (req, res) => {  // Main root
  res.status(200).send('This is the main route!');
});

/* Users routes */
router.post('/api/auth/signup', addUser)    // It related register or sign-up operation it is free, that way it is unprotected.
router.post('/api/auth/singin',login)       // it is not protected with JWT. It need correct password and email.
router.get('/api/auth/logout',logout) 

router.post('/api/users',verifyJWT,getAllUsers)
router.delete('/api/del-user',verifyJWT, deleteUser)
router.put('/api/update-user',verifyJWT, updateUser)

/* Coffee routes*/
router.post('/api/coffees/add-coffee', verifyJWT, addCoffee)
router.delete('/api/coffees/delete-coffee',verifyJWT, deleteCoffee)
router.put('/api/coffees/update-coffee', verifyJWT, updateCoffee)
router.get('/api/coffees/all-coffees', verifyJWT, getAllCoffees)
router.get('/api/coffees/best-sellers', verifyJWT, getBestSellers)


module.exports = router