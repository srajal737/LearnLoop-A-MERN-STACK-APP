const express = require('express');
const router = express.Router();


const {capturepayment,signatureverify,sendpaymentemail}=require('../controller/payment');
const {auth,isstudent} =require('../middleware/auth');

router.post('/capturepayment',auth,isstudent,capturepayment);

router.post('/verifysignature',auth,isstudent ,signatureverify);

router.post('/sendpaymentemail' , auth ,isstudent ,sendpaymentemail)

module.exports=router;