const userCtrl=require('../Controllers/UserController');

const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const Entreprise = require('../Models/Entreprise');
const Worker = require('../Models/Worker');
const Admin = require('../Models/Admin');



exports.login=(req,res,next)=>{
    User.findOne({username:req.body.username})
        .then(user=>{
            if(!user){
                return res.status(404).json({message:"login/mdp incorrect"});
            }
            bcrypt.compare(req.body.password,user.password)
                .then(valid=>{
                    if(!valid){
                        return res.status(401).json({message:"login/mdp incorrect"});
                    }
                    res.status(200).json({
                        user,
                        token:jwt.sign(
                            {
                                user_id:user._id,
                                user_Role:user.role
                            },
                            'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj',
                            {expiresIn:'24h'}
                        )
                    });
                })
                .catch(error=>res.status(500).json({error}));
        })
        .catch(error=>res.status(500).json({error}));
}

exports.signup = async (req, res, next) => {
    const user = await userCtrl.createUser(req.body);
    await user.save()
    if (user.role=="Entreprise") {
        const entreprise=new Entreprise({
            user,
            secteurActivite:req.body.secteurActivite,
            taille:req.body.taille,
            secteurActivite:req.body.secteurActivite,
            chiffreAffaires:req.body.chiffreAffaires,
            statutJuridique:req.body.statutJuridique,
            pays:req.body.pays,
        })
        Entreprise.save()
        .then((etp)=>res.status(201).send(etp))
        .catch(error=>res.status(400).send(error))
    } 
    else if (user.role=="Worker") {
        const worker=new Worker({
            user,
            skills:req.body.skills
        })
        Worker.save()
        .then((worker)=>res.status(201).send(worker))
        .catch(error=>res.status(400).send(error))
    }
    else {
        const admin=new Admin({
            user,
            skills:req.body.skills
        })
        Admin.save()
        .then((admin)=>res.status(201).send(admin))
        .catch(error=>res.status(400).send(error))
    }
}

