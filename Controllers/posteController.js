const Poste=require('../Models/Poste');

exports.addPoste=(req,res,next)=>{
    let data = req.body;
    data.entreprise=req.auth.user_id
    console.log("data",data);
    let poste = new Poste(data);
    poste.save()
        .then(
            (saved)=>{
                res.status(200).send(saved);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )

}

exports.getPosts=(req,res,next)=>{
    if (req.params?.id) {
        Poste.findOne({_id:req.params.id})
        .then(
            (poste)=>{
               res.status(200).send(poste);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
    } 
    else {
        Poste.find()
        .then(
            (posts)=>{
               res.status(200).send(posts);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err);
            }
        )
    }
    
}
exports.updatePoste=(req,res)=>{
    let id = req.params.id;
    let data = req.body; 
    Poste.findOne({ _id: id })
        .then((app) => {
            if (req.auth.user_id == app.entreprise) {
                console.log("here1");
                Poste.updateOne({ _id: id }, data)
                    .then(() => {
                        Poste.findOne({ _id: id })
                            .then((app) => res.status(200).send(app))
                            .catch(error => res.status(400).send(error))
                    }
                    )
                    .catch(
                        (err) => {
                            res.status(400).send(err);
                        }
                    )
            }
            else {
                console.log("here2");
                res.status(401).send('unauthorized')
            }
        })
        .catch(error => res.status(400).send('aaa'))
}
exports.deleteApp=(req,res)=>{    
    let id = req.params.id
    Poste.findOne({ _id: id })
        .then((app) => {
            if (req.auth.user_id == app.entreprise) {
                console.log("here1");
                Poste.deleteOne({ _id: id })
                    .then(
                        () => {
                            res.status(200).send({ message: 'deleted' });
                        }
                    )
                    .catch(
                        (err) => {
                            res.status(400).send(err);
                        }
                    )
            }
            else {
                console.log("here2");
                res.status(401).send('unauthorized')
            }
        })
        .catch(error => res.status(400).send('aaa'))
}
