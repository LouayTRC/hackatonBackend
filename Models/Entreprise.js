const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const entrepriseSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    secteurActivite: { 
        type: String ,
        required : true 
    },
    taille: { 
        type: Number 
    },
    chiffreAffaires: { 
        type: Number 
    },
    statutJuridique: { 
        type: String 
    },
    pays: { 
        type: String 
    },
    // dirigeants: { 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'User' 
    // },
    // partenaires: [{
    //     type: Schema.Types.ObjectId, 
    //     ref: 'User'
    // }]
},{versionKey:false,timestamps: true});

module.exports = mongoose.model('Entreprise', entrepriseSchema);
