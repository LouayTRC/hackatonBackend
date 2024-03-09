const express = require('express');
const router = express.Router();
const userCtrl = require('../Controllers/UserController')


router.get('/:id?', userCtrl.getUsers);


module.exports = router;