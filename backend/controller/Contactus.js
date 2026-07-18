const mailsend = require("../util/mailsender");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, number, countrycode } = req.body;

  if (!email || !firstname || !message) {
    return res.status(400).json({
      success: false,
      message: "Required fields missing",
    });
  }

  try {
    // ✅ 1. Send mail to ADMIN (YOU)
    await mailsend(
      process.env.ADMIN_EMAIL,
      "New Contact Form Submission",
      `
        <h2>New Contact Request</h2>
        <p><b>Name:</b> ${firstname} ${lastname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countrycode} ${number}</p>
        <p><b>Message:</b> ${message}</p>
      `
    );

    // ✅ 2. Send confirmation mail to USER
    await mailsend(
      email,
      "We received your message",
       `Having message:${message}`
    );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};