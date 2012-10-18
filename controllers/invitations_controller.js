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


exports.list_promoters = function(req, res, next){
  InvitationModel.find({ $and: [ {user :req.session.user._id}, { invitation_type: 'promoter'} ] } , function(err, invitations){
    if(!err){
      if(invitations){
        console.log('invitation - list - Se envian los invitations encontrados');
        res.render('invitations/list', {title: 'Lista de Invitaciones', user:req.session.user,invitations : invitations});
      }else{
        res.render('invitations/list', {title: 'Lista de Invitaciones', user:req.session.user, error: "No se han encontrado invitaciones"});
      }
    }else{
      console.log('invitation - list - '.red.bold + err);
    }
  });
}

exports.list_contacts = function(req, res, next){
  InvitationModel.find( { $and: [ {user :req.session.user._id}, { invitation_type: 'user'} ] } , function(err, invitations){
    if(!err){
      if(invitations){
        console.log('invitation - list - Se envian los invitations encontrados');
        res.render('invitations/list', {title: 'Lista de Invitaciones', user:req.session.user,invitations : invitations});
      }else{
        res.render('invitations/list', {title: 'Lista de Invitaciones', user:req.session.user});
      }
    }else{
      console.log('invitation - list - '.red.bold + err);
    }
  });
}

exports.view = function(req, res, next){
  console.log('invitations - view'.cyan.bold);
  console.log('invitations - view - Busco el invitation ( ' + req.params.id +' )');
  InvitationModel.findById( req.params.id , function(err, invitation){
    if(!err){
      if(invitation){
        console.log('invitations - view - Se encontro el invitation ( ' + req.params.id +' )');
        res.render('invitations/view', { title: 'invitation',
                        invitation : invitation,
                        user : req.session.user
                      });
      }else{
        console.log('invitations - view - No se encontro el invitation ( ' + req.params.id +' )');
      }
    }else{
      console.log('invitations - view - '.red.bold + err);
    }
  });
}
