const razorpay = require('razorpay');
require("dotenv").config();

exports.instance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
});




//razorpay integration link for docs
//https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/?utm_source=google&utm_medium=PMax&utm_campaign=RPHQL-RPPerf-Google-Pmax-Prospect-AllDevices-Competitor_keyeword-261225&utm_adgroup=&utm_content=&utm_term=&utm_gclid=&utm_campaignID=&utm_adgroupID=&utm_adID=&utm_network=&utm_device=&gad_source=1&gad_campaignid=23400237524&gbraid=0AAAAADdXWPpzSvKly6Y1m1YDlXuCVXx-Y&gclid=Cj0KCQiA18DMBhDeARIsABtYwT1VQRtwjlMqmRu_jYNPMFbF4UPhVpkluAplvU5Xbf80fJEPq1Dy3lgaAjc8EALw_wcB