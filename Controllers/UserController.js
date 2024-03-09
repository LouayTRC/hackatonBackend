const User=require('../Models/User');
const bcrypt=require('bcrypt');


exports.createUser=(userData)=>{
  return bcrypt.hash(userData.password,10)
    .then(hash => {
        const user=new User({
            mail:userData.mail,
            username:userData.username,
            password:hash,
            fullname:userData.fullname,
            birthday:userData.birthday,
            description:userData.description,
            reseauxSociaux:userData.reseauxSociaux, 
            phone:userData.phone, 
            role:userData.role, 
            pdp:userData.pdp
        })
        return user;
    })
}
