const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'carmelo91@ethereal.email',
        pass: 'tfzDuTVhyABFHKBwY5'
    }
});

module.exports = {transporter}