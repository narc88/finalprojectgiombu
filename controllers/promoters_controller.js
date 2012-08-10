var PromoterModel = require('../models/promoter').PromoterModel;
var PromoterTextModel = require('../models/promoter_text').PromoterTextModel;



exports.register = function (req, res, next) {
  res.render('promoters/register', {title: 'Registro de Promotor'});
}

exports.add = function (req, res, next) {
  var promoter_new = new PromoterModel();
  var promoter_text_new = new PromoterTextModel();
  promoter_text_new.page_title = req.body.page_title
  promoter_text_new.page_body = req.body.page_body
  promoter_text_new.subscribers_invite = req.body.subscribers_invite

  promoter_new.parent_id = req.body.parent_id
  promoter_new.promoter_text = promoter_text_new
  req.session.user.promoter = promoter_new
  console.log(req.session.user)
  promoter_new.save(function(err){
  if(!err){
      console.log(user_new);
    } else {
      console.log("Error: - " + err);
    }
    res.redirect('/');
  });
  res.render('/', {title: 'Cargar Oferta'});
}
