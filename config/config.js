//import dotenv from 'dotenv';
const dotenv = require('dotenv')

dotenv.config();

// export default {
//     PORT: process.env.PORT || 3000,
//     MONGOURI: process.env.MONGOURI
// } 

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGOURI: process.env.MONGOURI
}