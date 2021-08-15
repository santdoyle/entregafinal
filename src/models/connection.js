const mongoose = require('mongoose')

const url = 'mongodb+srv://santdoyle:12345@cluster0.1j600.mongodb.net/myFirstDatabase'
let rpta =  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, err => {
    console.log('Error: ' + err)
})

console.log('Connected')