const Discussion=require('../Models/Discussion');
const Message=require('../Models/Message');
const User = require('../Models/User');

exports.createDiscussion=(req,res,next)=>{
    const discussion=new Discussion({
        user1:req.auth.user_id,
        user2:req.body.user2,
        messages:[]
    })
    discussion.save()
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
exports.deleteDiscussion=(req,res,next)=>{
    Discussion.deleteOne({_id:req.params.id})
    .then(
        ()=>{
            res.status(200).send({message:'deleted'});
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
}

exports.sendMessage=(req,res,next)=>{
    const msg=new Message({
        sender:req.auth.user_id,
        discussion:req.params.id,
        message:req.body.message
    })
    msg.save()
    .then(async (message)=>{
        const updatedDiscussion = await Discussion.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { messages: message._id } },
            { new: true }
          ).populate('messages');
      
          res.json({ message: 'Message sent successfully', discussion: updatedDiscussion });
    })
    
}

exports.getDiscussions=async (req,res,next)=>{
    if (req.params?.id) {
        const discussions = await Discussion.findOne({_id:req.auth.id})
        .populate('messages')
        res.status(200).send(discussions)
    } 
    else {
        const discussions = await Discussion.find({ $or: [{ user1: req.auth.user_id }, { user2: req.auth.user_id     }] })
        .populate('messages')
        res.status(200).send(discussions)
    }
    
}