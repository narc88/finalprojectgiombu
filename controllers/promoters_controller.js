var UserModel = require('../models/user').UserModel;
var PromoterModel = require('../models/promoter').PromoterModel;
var PromoterTextModel = require('../models/promoter_text').PromoterTextModel;



exports.register = function (req, res, next) {
  res.render('promoters/register', {title: 'Registro de Promotor'});
}

exports.add = function (req, res, next) {
  UserModel.findOne({_id: req.session.user._id}, function(err, doc){
    var user = new UserModel();
    user = doc;
    var promoter_new = new PromoterModel();
    var promoter_text_new = new PromoterTextModel();
    promoter_text_new.page_title = req.body.page_title
    promoter_text_new.page_body = req.body.page_body
    promoter_text_new.subscribers_invite = req.body.subscribers_invite

    promoter_new.parent_id = req.body.parent_id
    promoter_new.promoter_text = promoter_text_new

    req.session.user.promoter = promoter_new
    user.promoter = promoter_new
    
    user.save(function(err){
    if(!err){
        console.log(user);
      } else {
        console.log("Error: - " + err);
      }
    });
    res.render('users/register', {title: 'Cargar Oferta'});
  });
}


exports.list_sons = function (req, res, next) {
  UserModel.find({ 'user.promoter.parent_id': req.session.user._id}, function(err, users){
   console.log(users);
    res.render('promoters/list_sons', {title: 'Tus promotores',user:req.session.user, users:users});
  });
  res.render('promoters/list_sons', {title: 'Tus promotores',user:req.session.user, empty:true});

}
