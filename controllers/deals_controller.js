var DealModel = require('../models/deal').DealModel;
var colors = require('colors');


exports.create = function (req, res, next) {
  res.render('deals/create', {title: 'Cargar Oferta'})
}

exports.add = function (req, res, next) {

  console.log('deals - add'.cyan.bold);

  var deal_new = new Deal();
  deal_new.title = req.body.title
  deal_new.tagline = req.body.tagline
  deal_new.slug = req.body.slug
  deal_new.characteristics = req.body.characteristics
  deal_new.conditions = req.body.conditions
  deal_new.price = req.body.price
  deal_new.special_price = req.body.special_price
  deal_new.discount = req.body.discount
  deal_new.start_date = req.body.start_date
  deal_new.end_date = req.body.end_date
  deal_new.start_redeem = req.body.start_redeem
  deal_new.end_redeem = req.body.end_redeem
  deal_new.max_coupons = req.body.max_coupons
  deal_new.max_coupons_by_user = req.body.max_coupons_by_user
  deal_new.seller_percentage = req.body.seller_percentage
  deal_new.giombu_percentage = req.body.giombu_percentage
  deal_new.promoter_percentage = req.body.promoter_percentage
  deal_new.status = req.body.status
  deal_new.sale_count = req.body.sale_count //Yo no lo pondria
  deal_new.shipping_cost = req.body.shipping_cost
  deal_new.store = req.body.store
  deal_new.seller = req.body.seller
  deal_new.franchisor = req.body.franchisor
  deal_new.franchise = req.body.franchise
  deal_new.currency = req.body.currency
  deal_new.images = req.body.images

  deal_new.save(function (err) {
    if (!err) {
      console.log('deals - add - Guardo una nueva deal');
    } else {
      console.log('deals - add - '.red.bold + err);
      res.redirect('/');
    }
    
  });


  console.log('deals - add - Redirecciono a deals/create');
  res.render('deals/create', {title: 'Cargar Oferta'});
}

exports.view = function(req, res, next){

	console.log('deals - view'.cyan.bold);
	console.log('deals - view - Busco el deal ( ' + req.body.deal_id +' )');

	DealModel.findById( req.body.deal_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deals - view - Se encontro el deal ( ' + req.body.deal_id +' )');
				res.render('deals/view', {title: 'Deal', deal : deal});
			}else{
				console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}

  });
}


exports.edit = function(req, res, next){

	console.log('deals - edit'.cyan.bold);
	console.log('deals - edit - Busco el deal ( ' + req.body.deal_id +' )');

	DealModel.findById( req.body.deal_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deals - edit - Se encontro el deal ( ' + req.body.deal_id +' )');
				
				//Edicion del deal



			}else{
				console.log('deals - edit - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - edit - '.red.bold + err);
		}

  });

}