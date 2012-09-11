var SaleModel = require('../models/sale').SaleModel;
var DealModel = require('../models/deal').DealModel;


exports.checkout = function (req, res, next) {
  DealModel.findById( req.params.id , function(err, deal){
    if(!err){
      if(deal){
       var list = new Array() 
        for (var i = 1; i < deal.max_coupons_by_user ; i++) {
          list[i-1] = i; console.log(list[i-1]);
        };
       
        res.render('sales/checkout', {title: 'Detalle del pedido', deal : deal , list : list, user:req.session.user});
      }else{
        res.render('sales/checkout', {title: 'Error'});
      }
    }else{
    }
  });
  
}

exports.buy = function (req, res, next) {
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
