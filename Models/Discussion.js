const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const discussionSchema = new Schema({
    user1: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    user2:{
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    messages:[{
        type: Schema.Types.ObjectId, 
        ref: 'Message'
    }],
    
    
},{ timestamps: true ,versionKey:false});


const Application = mongoose.model('Discussion', discussionSchema);

module.exports = Application;