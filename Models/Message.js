const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    discussion:{
        type: Schema.Types.ObjectId, 
        ref: 'Discussion' 
    },
    message:{
        type:String,
        required:true
    },
    
    
},{ timestamps: true ,versionKey:false});


const Application = mongoose.model('Message', messageSchema);

module.exports = Application;