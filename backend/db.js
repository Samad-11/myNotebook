const mongoose = require('mongoose');
const connectToMongo = () =>{ mongoose.connect('mongodb+srv://root:Samad12@cluster0.bqvtg17.mongodb.net/');
}
// const connectToMongo = () =>{
//     mongoose.connect(mongoURI)
// }
module.exports = connectToMongo;