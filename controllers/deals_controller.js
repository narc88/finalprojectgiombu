var DealModel = require('../models/deal').DealModel;
var colors = require('colors');


exports.create = function (req, res, next) {
	console.log('deals - create'.cyan.bold);
	res.render('deals/create', {title: 'Cargar Oferta'});
}

exports.add = function (req, res, next) {

	console.log('deals - add'.cyan.bold);

	var deal_new = new DealModel(req.param('deal'));

	deal_new.sale_count = 0; 		//Yo no lo pondria
	deal_new.coupon_count = 0;

	//Validar los ids de los siguientes datos
/*
	deal_new.store = '';
	deal_new.seller = '';
	deal_new.franchisor = '';
	deal_new.franchise = '';
	deal_new.currency = '';
	deal_new.images = '';
*/

	deal_new.save(function (err) {
		if (!err) {
			console.log('deals - add - Guardo una nueva deal');
			console.log('deals - add - Redirecciono a deals/create');
			res.render('deals/view', {title: 'Deals View', deals : [deal_new]});
		} else {
			console.log('deals - add - '.red.bold + err);
			console.log('deals - add - Redirecciono a /');
			res.redirect('/');
		}

	});

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

				edited_deal = req.param('deal');


				deal.save(function (err) {
					if (!err) {
						console.log('deals - edit - Guardo una nueva deal');
						console.log('deals - edit - Redirecciono a deals/create');
						res.render('deals/view', {title: 'Deals View', deals : [deal_new]});
					} else {
						console.log('deals - edit - '.red.bold + err);
						console.log('deals - edit - Redirecciono a /');
						res.redirect('/');
					}

				});



			}else{
				console.log('deals - edit - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - edit - '.red.bold + err);
		}

  });

}


exports.delete = function(req, res, next){

	console.log('deals - delete'.cyan.bold);
	console.log('deals - delete - Busco el deal ( ' + req.body.deal_id +' )');

	DealModel.findById( req.body.deal_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deals - delete - Se encontro el deal ( ' + req.body.deal_id +' )');
				
				//Elimino el deal
				deal.remove(function(err){
					if(!err){
						console.log('deals - delete - Se elimina el deal ( ' + req.body.deal_id +' )');
					}else{
						console.log('deals - delete - '.red.bold + err);
					}
				})

			}else{
				console.log('deals - delete - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - delete - '.red.bold + err);
		}

  });

}
