//razorpay short if want then go to npm razorpay there you got varies links for corresponding code setup 
//link of above talk is :-https://www.npmjs.com/package/razorpay  -->>qr code also give.




const { instance } = require('../config/razorpay');
const user = require('../model/User');
const course = require('../model/course');
require("dotenv").config();
const mailsend = require('../util/mailsender');
const crypto = require("crypto")
const mongoose = require("mongoose")
const courseprogress = require('../model/courseprogress')
//payment 2 step ->>>1.capture payment and order creation --->>2.verify signature


//creating payment -->>for multiple buy at once simple

exports.capturepayment = async (req, res) => {
    const { courses } = req.body;
    const userid = req.user.id;
    if (courses.lenght === 0) {
        return res.status(200).json({
            success: false,
            message: "no course found"
        })
    }

    let total_amount = 0;

    for (const course_id of courses) {
        let coursefind;
        try {
            coursefind = await course.findById(course_id);
            if (!coursefind) {
                return res.status(200).json({
                    success: false,
                    message: "course not found"
                })
            }

            const useridobj = new mongoose.Types.ObjectId(userid);

            if (coursefind.studentsEnrolled.includes(useridobj)) {
                return res.status(200).json({
                    success: false,
                    message: "student already in course"
                })
            }

            total_amount += coursefind.price;
        } catch (e) {
            res.status(500).json({
                success: false,
                message: "internal server error"
            })
        }
    }

    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString()
    }


    //payment

    try {
        const response = await instance.orders.create(options);
        if (response) {
            return res.json({
                success: true,
                data: response
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            success: false,
            message: "could not create order"
        })
    }
}


//signature verify

exports.signatureverify = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses

    const userid = req.user.id

    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses || !userid) {
        return res.status(200).json({
            sucess: false,
            message: "payment failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const signature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex")

    if (signature === razorpay_signature) {
        await enrollstudent(courses, userid, res)
        return res.status(200).json({
            success: true, message: "payment successfull"
        })
    }

    return res.status(200).json({
        success: false, message: "payment failed"
    })
}

const enrollstudent = async (courses, userid, res) => {
    if (!courses || !userid) {
        return res.status(400).json({
            success: false, message: "course id or user id not found"
        })
    }

    for (const courseid of courses) {
        try {

            const enrolledcourse = await course.findOneAndUpdate(
                {
                    _id: courseid,
                    studentsEnrolled: { $ne: userid }
                },
                {
                    $push: {
                        studentsEnrolled: userid
                    },
                    $inc: {
                        totalstudent: 1
                    }
                },
                { new: true }
            );

            if (!enrolledcourse) {
                return res.status(500).json({ success: false, message: "course not found to enroll" })
            }

            const courseprogressget = await courseprogress.create({ courseid: courseid, userid: userid, videocompleted: [] });

            const enrolledstudent = await user.findByIdAndUpdate(userid, {
                $push: { courses: courseid, courseprogress: courseprogressget._id }
            }, { new: true })


            const emailres = await mailsend(enrolledstudent.email, `You Have successfully Buyed And Enrolled in Course ${enrolledcourse.name}`, `Congrats and Happy Buy Dear ${enrolledstudent.firstname}`);

        }
        catch (e) {
   
            return res.status(400).json({ success: false, error: e.message })
        }
    }
}

//sending receipt mail

exports.sendpaymentemail = async (req, res) => {
    const { orderid, paymentid, amount } = req.body;
    const userid = req.user.id;
    if (!orderid || !paymentid || !amount || !user) {
        return res.status(404).json({
            success: false,
            message: "all details give"
        })
    }

    try {
        const enrolledstudent = await user.findById(userid);

        await mailsend(enrolledstudent.email, `Payment Done`, `${enrolledstudent.firstname} ${enrolledstudent.lastname} Have Sucessfully Buyed a course with order id:${orderid} , Amount Paid: ${amound / 100} , with paymentID : ${paymentid}  HAPPY STUDY`)
    }

    catch (e) {
        return res.status(400).json({ success: false, message: "could not send email" })
    }
}