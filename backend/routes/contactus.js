const express = require('express');
const router = express.Router();
const {contactUsController} = require('../controller/Contactus');
router.post('/contactusform',contactUsController);
module.exports = router;