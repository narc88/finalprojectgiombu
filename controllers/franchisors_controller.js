var FranchisorModel = require('../models/franchisor').FranchisorModel;
var colors = require('colors');


exports.create = function (req, res, next) {
  res.render('franchisors/create', {title: 'Create Franchisor'})
}

exports.add = function (req, res, next) {

  console.log('franchisor - add'.cyan.bold);

	var franchisor_new = new FranchisorModel(req.param('franchisor'));

	franchisor_new.franchise_count = 0;

	// Validar los objetos embebidos
	franchisor_new.save(function (err) {
	if (!err) {
	    console.log('franchisor - add - Save');
		console.log('franchisor - add - Redirecciono a franchisors/view');
		res.render('franchisors/view', {title: 'Franchises View', franchisors : [franchisor]});
	} else {
	  console.log('franchisor - add - '.red.bold + err);
	  res.redirect('/');
	}

	});

}



exports.list = function(req, res, next){

	console.log('franchisor - list'.cyan.bold);

	FranchisorModel.find( {} , function(err, franchisors){
		if(!err){
			if(franchisors){
				console.log('franchisor - list - Se envian los franchisors encontrados');
				res.render('franchisors/view', {title: 'Lista de Franchisors', franchisors : franchisors});
			}else{
				console.log('franchisor - list - No hay franchisors');
			}
		}else{
			console.log('franchisor - list - '.red.bold + err);
		}

  });
}



exports.view = function(req, res, next){

	console.log('franchisor - view'.cyan.bold);
	console.log('franchisor - view - Busco el franchisor ( ' + req.body.franchisor_id +' )');

	FranchisorModel.findById( req.body.franchisor_id , function(err, franchisor){
		if(!err){
			if(franchisor){
				console.log('franchisor - view - Se encontro el franchisor ( ' + req.body.franchisor_id +' )');
				res.render('franchisor/view', {title: 'franchisor', franchisor : franchisor});
			}else{
				console.log('franchisor - view - No se encontro el franchisor ( ' + req.body.franchisor_id +' )');
			}
		}else{
			console.log('franchisor - view - '.red.bold + err);
		}

  });
}



exports.update = function(req, res, next){

	console.log('franchisor - update'.cyan.bold);
	console.log('franchisor - update - Busco el franchisor ( ' + franchisor_id +' )');

	var franchisor_id = req.body.franchisor_id;
	var edited_franchisor = req.param('franchisor');

	FranchisorModel.findById( franchisor_id , function(err, franchisor){
		if(!err){
			if(franchisor){
				console.log('franchisor - update - Se encontro el franchisor ( ' + franchisor_id +' )');
				
				//Edicion del franchisor
				//Revisar cuales quieren ser editados

				for (field in edited_franchisor){
					if(edited_franchisor[field] != ''){
						franchisor[field] = edited_franchisor[field];
						console.log('franchisor - update - Edito el campo '+ field);
					}
				}
				//Validar los objetos embebidos

				//country	   			: req.body.country;
				//currency   			: req.body.currency;
				//franchises			: req.body.franchises;

				franchisor.save(function (err) {
					if (!err) {
					    console.log('franchisor - update - Save');
						console.log('franchisor - update - Redirecciono a franchisors/view');
						res.render('franchisors/view', {title: 'Franchises View', franchisors : [franchisor]});
					} else {
					  console.log('franchisor - update - '.red.bold + err);
					  res.redirect('/');
					}

				});

			}else{
				console.log('franchisor - update - No se encontro el franchisor ( ' + franchisor_id +' )');
			}
		}else{
			console.log('franchisor - update - '.red.bold + err);
		}

  });

}


exports.edit = function(req, res, next){

	FranchisorModel.findById( req.params.franchisor_id, function(err, franchisor){
		
		if(!err){
			if(franchisor){
				console.log('franchisor - edit - Franchisor encontrado, redirecciono a franchisors/edit');
				res.render('franchisors/edit', {title: 'Franchisor Edit', franchisor : franchisor});
			}else{
				console.log('franchisor - edit - No se encontro el franchisor ( ' + req.body.franchisor_id +' )');
			}
		}else{
			
			console.log('franchisor - edit - '.red.bold + err);
			res.redirect('/');
		}

	});
	
}


exports.delete = function(req, res, next){

	console.log('franchisor - delete'.cyan.bold);
	console.log('franchisor - delete - Busco el franchisor ( ' + req.body.franchisor_id +' )');

	FranchisorModel.findById( req.body.franchisor_id , function(err, franchisor){
		if(!err){
			if(franchisor){
				console.log('franchisor - delete - Se encontro el franchisor ( ' + req.body.franchisor_id +' )');
				
				//Elimino el franchisor
				franchisor.remove(function(err){
					if(!err){
						console.log('franchisor - delete - Se elimina el franchisor ( ' + req.body.franchisor_id +' )');
					}else{
						console.log('franchisor - delete - '.red.bold + err);
					}
				})

			}else{
				console.log('franchisor - delete - No se encontro el franchisor ( ' + req.body.franchisor_id +' )');
			}
		}else{
			console.log('franchisor - delete - '.red.bold + err);
		}

  });

}
