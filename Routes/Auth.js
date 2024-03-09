const express=require('express');
const authCtrl=require('../Controllers/AuthController.js');
const router=express.Router();

router.post('/login',authCtrl.login);
router.post('/signup',authCtrl.signup);

module.exports=router;