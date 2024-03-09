const mongoose=require('mongoose');


const posteSchema=mongoose.Schema({
    entreprise:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Entreprise',
        required: true
    },
    description:{type:String,required:true},
    requiredSkills:[{type:String}],
    requiredExperience:[{type:String}],
    salaire:{type:Number,required:true},
    negociable:{type:Boolean,required:true},
    statut:{type:Boolean,required:true}

},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Poste',posteSchema);