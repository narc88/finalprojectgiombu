var DealModel = require('../models/deal').DealModel;
var colors = require('colors');


exports.create = function (req, res, next) {
	console.log('deals - create'.cyan.bold);
	res.render('deals/create', {title: 'Cargar Oferta', user: req.session.user});
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
			res.render('deals/view', {title: 'Deals View', user: req.session.user, deals : [deal_new]});
		} else {
			console.log('deals - add - '.red.bold + err);
			console.log('deals - add - Redirecciono a /');
			res.redirect('/');
		}

	});

}

exports.view = function(req, res, next){
	DealModel.findById( req.params.id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deals - view - Se encontro el deal ( ' + req.params.id +' )');
				res.render('deals/view', {title: 'Deal', deal : deal});
			}else{
				console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}
  });
}

exports.review = function(req, res, next){
	DealModel.findById( req.params.id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deals - view - Se encontro el deal ( ' + req.params.id +' )');
				res.render('deals/review', {title: 'Deal', user: req.session.user,deal : deal});
			}else{
				console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}
  });
}

exports.list = function(req, res, next){
	console.log('deal - list'.cyan.bold);
	DealModel.find( {} , function(err, deals){
		if(!err){
			if(deals){
				console.log('deal - list - Se envian los deals encontrados');
				res.render('deals/view', {title: 'Lista de deals', deals : deals});
			}else{
				console.log('deal - list - No hay deals');
			}
		}else{
			console.log('deal - list - '.red.bold + err);
		}

  });
}



exports.update = function(req, res, next){

	console.log('deal - update'.cyan.bold);
	console.log('deal - update - Busco el deal ( ' + req.body.deal_id +' )');

	DealModel.findById( req.body.deal_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deal - update - Se encontro el deal ( ' + req.body.deal_id +' )');
				
				//Edicion del deal
				//Hacer que solo se graben los campos editados


				edited_deal = req.param('deal');


				for (field in edited_deal){
					if(edited_deal[field] != ''){
						deal[field] = edited_deal[field];
						console.log('deal - update - Edito el campo '+ field);
					}
				}



				deal.save(function (err) {
					if (!err) {
						console.log('deal - update - Guardo una nueva deal');
						console.log('deal - update - Redirecciono a deal/create');
						//res.render('deal/create', {title: 'Cargar Franquicia'});
						res.render('deal/view', {title: 'deal View', deal : [deal]});
					} else {
						console.log('deal - update - '.red.bold + err);
						console.log('deal - update - Redirecciono a /');
						res.redirect('/');
					}

				});



			}else{
				console.log('deal - edit - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deal - edit - '.red.bold + err);
		}

  });

}


exports.edit = function(req, res, next){
	DealModel.findById( req.params.deal_id, function(err, deal){
		if(!err){
			if(deal){
				console.log('deal - edit - deal encontrado, redirecciono a deal/edit');
				res.render('deals/edit', {title: 'deal Edit', deal : deal});
			}else{
				console.log('deal - edit - No se encontro el deal ( ' + req.params.deal_id +' )');
			}
		}else{
			
			console.log('deal - edit - '.red.bold + err);
			res.redirect('/');
		}
	});	
}


exports.remove = function(req, res, next){

	console.log('deals - remove'.cyan.bold);
	console.log('deals - remove - Busco el deal ( ' + req.params.deal_id +' )');

	DealModel.findById( req.body.deal_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('deals - remove - Se encontro el deal ( ' + req.params.deal_id +' )');
				
				//Elimino el deal
				deal.remove(function(err){
					if(!err){
						console.log('deals - remove - Se elimina el deal ( ' + req.params.deal_id +' )');
						res.redirect('/');
					}else{
						console.log('deals - remove - '.red.bold + err);
						res.redirect('/deals/list');
					}
				})

			}else{
				console.log('deals - remove - No se encontro el deal ( ' + req.params.deal_id +' )');
				res.redirect('/deals/list');
			}
		}else{
			console.log('deals - remove - '.red.bold + err);
			res.redirect('/');
		}

  });

}


exports.show = function(req, res, next){
	DealModel.find( {} , function(err, deals){
		if(!err){
			if(deals.length){
				console.log('deals - show - Se encontraron deals, renderizo /deals/show');
				res.render('deals/deals_show', { title : 'Deals show', user: req.session.user ,deals : deals});
			}else{
				console.log('deals - show - No se encontraron deals');
			}
		}else{

			console.log('deals - show - '.red.bold + err);
		}
	});
}

exports.list = function(req, res, next){
	DealModel.find( {} , function(err, deals){
		if(!err){
			if(deals.length){
				console.log('deals - show - Se encontraron deals, renderizo /deals/list');
				res.render('deals/list', { title : 'Lista de deals activos', user: req.session.user ,deals : deals});
			}else{
				console.log('deals - show - No se encontraron deals');
			}
		}else{
			console.log('deals - show - '.red.bold + err);
		}
	});
}