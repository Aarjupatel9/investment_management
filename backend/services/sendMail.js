const nodemailer = require('nodemailer');
const MAILER= "aditipatel2692002@gmail.com";
const MAILER_PASS= "snbbaqgiqkgmklsc";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: MAILER,
        pass: MAILER_PASS,
    },
});

const sendMail = async (to, subject, content, html) => {
    try {
        console.log(MAILER);
        const mailOptions = {
            from:MAILER,
            to: to,
            subject: subject,
            text: html ? "" : content,
            html: html
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { error: null, info };
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};


module.exports = sendMail;