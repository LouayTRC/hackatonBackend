const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    worker: { 
        type: Schema.Types.ObjectId, 
        ref: 'Worker' 
    },
    titre: { 
        type: String ,
        required : true 
    },
    description: { 
        type: String ,
        required : true
    },
    services: [{ type: String }] ,
    prix: { 
        type: Number 
    },
    statut: { 
        type: Boolean
    },
    
},{ timestamps: true ,versionKey:false});


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;