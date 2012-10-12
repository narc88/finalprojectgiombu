var CurrencyModel = require('../models/currency').CurrencyModel;
var colors = require('colors');


exports.create = function (req, res, next) {
  res.render('currencies/create', {title: 'Create Currency'})
}

exports.add = function (req, res, next) {

  console.log('Currency - add'.cyan.bold);

	var Currency_new = new CurrencyModel(req.param('Currency'));

	Currency_new.franchise_count = 0;

	// Validar los objetos embebidos
	Currency_new.save(function (err) {
	if (!err) {
	    console.log('Currency - add - Save');
		console.log('Currency - add - Redirecciono a currencies/view');
		res.render('currencies/view', {title: 'Currencies View', currencies : [Currency]});
	} else {
	  console.log('Currency - add - '.red.bold + err);
	  res.redirect('/');
	}
	});
}



exports.list = function(req, res, next){

	console.log('Currency - list'.cyan.bold);

	CurrencyModel.find( {} , function(err, currencies){
		if(!err){
			if(currencies){
				console.log('Currency - list - Se envian los currencies encontrados');
				res.render('currencies/list', {title: 'Lista de Monedas', currencies : currencies});
			}else{
				console.log('Currency - list - No hay currencies');
			}
		}else{
			console.log('Currency - list - '.red.bold + err);
		}

  });
}



exports.view = function(req, res, next){

	console.log('Currency - view'.cyan.bold);
	console.log('Currency - view - Busco el Currency ( ' + req.params.Currency_id +' )');

	CurrencyModel.findById( req.params.Currency_id , function(err, Currency){
		if(!err){
			if(Currency){
				console.log('Currency - view - Se encontro la Moneda ( ' + req.params.Currency_id +' )');
				res.render('currencies/view', {title: 'Currency', currencies : [Currency]});
			}else{
				console.log('Currency - view - No se encontro la Moneda ( ' + req.params.Currency_id +' )');
			}
		}else{
			console.log('Currency - view - '.red.bold + err);
		}

  });
}



exports.update = function(req, res, next){

	console.log('Currency - update'.cyan.bold);
	console.log('Currency - update - Busco el Currency ( ' + Currency_id +' )');

	var Currency_id = req.body.Currency_id;
	var edited_Currency = req.param('Currency');

	CurrencyModel.findById( Currency_id , function(err, Currency){
		if(!err){
			if(Currency){
				console.log('Currency - update - Se encontro la Moneda ( ' + Currency_id +' )');
				
				//Edicion del Currency
				//Revisar cuales quieren ser editados

				for (field in edited_Currency){
					if(edited_Currency[field] != ''){
						Currency[field] = edited_Currency[field];
						console.log('Currency - update - Edito el campo '+ field);
					}
				}
				//Validar los objetos embebidos

				Currency.save(function (err) {
					if (!err) {
					    console.log('Currency - update - Save');
						console.log('Currency - update - Redirecciono a currencies/view');
						res.render('currencies/view', {title: 'Currencies View', currencies : [Currency]});
					} else {
					  console.log('Currency - update - '.red.bold + err);
					  res.redirect('/');
					}

				});

			}else{
				console.log('Currency - update - No se encontro el Currency ( ' + Currency_id +' )');
			}
		}else{
			console.log('Currency - update - '.red.bold + err);
		}

  });

}


exports.edit = function(req, res, next){

	CurrencyModel.findById( req.params.Currency_id, function(err, Currency){
		
		if(!err){
			if(Currency){
				console.log('Currency - edit - Currency encontrado, redirecciono a currencies/edit');
				res.render('currencies/edit', {title: 'Currency Edit', Currency : Currency});
			}else{
				console.log('Currency - edit - No se encontro el Currency ( ' + req.body.Currency_id +' )');
			}
		}else{
			
			console.log('Currency - edit - '.red.bold + err);
			res.redirect('/');
		}

	});
	
}


exports.delete = function(req, res, next){

	console.log('Currency - delete'.cyan.bold);
	console.log('Currency - delete - Busco el Currency ( ' + req.body.Currency_id +' )');

	CurrencyModel.findById( req.body.Currency_id , function(err, Currency){
		if(!err){
			if(Currency){
				console.log('Currency - delete - Se encontro el Currency ( ' + req.body.Currency_id +' )');
				
				//Elimino el Currency
				Currency.remove(function(err){
					if(!err){
						console.log('Currency - delete - Se elimina el Currency ( ' + req.body.Currency_id +' )');
					}else{
						console.log('Currency - delete - '.red.bold + err);
					}
				})

			}else{
				console.log('Currency - delete - No se encontro el Currency ( ' + req.body.Currency_id +' )');
			}
		}else{
			console.log('Currency - delete - '.red.bold + err);
		}

  });

}
