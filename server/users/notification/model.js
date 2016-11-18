/**
 * Created by Jens on 26-Oct-16.
 */
const mongoose = require('mongoose');
const config = require('../../config/index');

// var NotificationSchema = new mongoose.Schema({
//     _recipient: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required:true
//     },
//     message: {
//         type: String,
//         required: true
//     },
//     creation: {
//         type: Date,
//         required
//     },
//     isRead: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
//     linkTo: {
//         type: String
//     }
// });