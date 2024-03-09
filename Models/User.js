const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
    mail:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    fullname:{type:String,required:true},
    description:{type:String,required:true},
    reseauxSociaux: [{
        plateforme: { type: String },
        lien: { type: String }
    }], 
    birthday: { type: String },
    phone:{type:String,required:true},
    role:{type:String},
    pdp:{type:String}
},{ versionKey: false,timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);