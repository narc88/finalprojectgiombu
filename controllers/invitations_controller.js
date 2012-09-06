var InvitationModel = require('../models/invitation').InvitationModel;




exports.create = function (req, res, next) {
  res.render('invitations/create', {title: 'Invitar personas a unirse a giombu', user:req.session.user});
}

exports.add = function (req, res, next) {
 var invitation_new = new InvitationModel(req.param('invitation'));
  invitation_new.user = req.session.user._id;
 // var invitation = new InvitationModel(req.param('invitation'));
  InvitationModel.find({ user: req.session.user._id }).where('email').equals(invitation_new.email).exec(function (err, invitation) {
    if (invitation){
     res.render('invitations/create', {title: 'Cargar Invitacion' , user:req.session.user, messagge : "Ya has invitado a: "+ invitation_new.email});
    }else{
      invitation_new.save(function(err){
      if(!err){
          console.log(invitation_new);
        } else {
          console.log("Error: - " + err);
        }
        res.render('invitations/create');
      });
      res.render('invitations/create', {title: 'Cargar Invitacion' , user:req.session.user, messagge : "Invitacion enviada con éxito a: "+ invitation_new.email});
    }
  });
}
