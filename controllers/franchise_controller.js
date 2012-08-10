var FranchiseModel = require('../models/franchise').FranchiseModel;
var colors = require('colors');


exports.create = function (req, res, next) {
	console.log('franchises - create'.cyan.bold);
	res.render('franchises/create', {title: 'Cargar Franquicia'})
}

exports.add = function (req, res, next) {

	console.log('franchises - add'.cyan.bold);

	var franchise_new = new FranchiseModel();

	franchise_new.name				: req.body.name;
	franchise_new.slug				: req.body.slug;
	franchise_new.is_default		: req.body.is_default;
	franchise_new.timezone			: req.body.timezone;
	franchise_new.user_count		: req.body.user_count;
	franchise_new.subscriber_count	: req.body.subscriber_count;
	franchise_new.store_count		: req.body.store_count;

	franchise_new.save(function (err) {
		if (!err) {
			console.log('franchises - add - Guardo una nueva franchise');
			console.log('franchises - add - Redirecciono a franchises/create');
			res.render('franchises/create', {title: 'Cargar Franquicia'});
		} else {
			console.log('franchises - add - '.red.bold + err);
			console.log('franchises - add - Redirecciono a /');
			res.redirect('/');
		}

	});

}



exports.view = function(req, res, next){

	console.log('franchises - view'.cyan.bold);
	console.log('franchises - view - Busco el franchise ( ' + req.body.franchise_id +' )');

	FranchiseModel.findById( req.body.franchise_id , function(err, franchise){
		if(!err){
			if(franchise){
				console.log('franchises - view - Se encontro el franchise ( ' + req.body.franchise_id +' )');
				res.render('franchises/view', {title: 'franchise', franchise : franchise});
			}else{
				console.log('franchises - view - No se encontro el franchise ( ' + req.body.franchise_id +' )');
			}
		}else{
			console.log('franchises - view - '.red.bold + err);
		}

  });
}



exports.edit = function(req, res, next){

	console.log('franchises - edit'.cyan.bold);
	console.log('franchises - edit - Busco el franchise ( ' + req.body.franchise_id +' )');

	FranchiseModel.findById( req.body.franchise_id , function(err, franchise){
		if(!err){
			if(franchise){
				console.log('franchises - edit - Se encontro el franchise ( ' + req.body.franchise_id +' )');
				
				//Edicion del franchise
				//Hacer que solo se graben los campos editados
				franchise.name				: req.body.name;
				franchise.slug				: req.body.slug;
				franchise.is_default		: req.body.is_default;
				franchise.timezone			: req.body.timezone;
				franchise.user_count		: req.body.user_count;
				franchise.subscriber_count	: req.body.subscriber_count;
				franchise.store_count		: req.body.store_count;


			}else{
				console.log('franchises - edit - No se encontro el franchise ( ' + req.body.franchise_id +' )');
			}
		}else{
			console.log('franchises - edit - '.red.bold + err);
		}

  });

}


exports.delete = function(req, res, next){

	console.log('franchises - delete'.cyan.bold);
	console.log('franchises - delete - Busco el franchise ( ' + req.body.franchise_id +' )');

	FranchiseModel.findById( req.body.franchise_id , function(err, franchise){
		if(!err){
			if(franchise){
				console.log('franchises - delete - Se encontro el franchise ( ' + req.body.franchise_id +' )');
				
				//Elimino el franchise
				franchise.remove(function(err){
					if(!err){
						console.log('franchises - delete - Se elimina el franchise ( ' + req.body.franchise_id +' )');
					}else{
						console.log('franchises - delete - '.red.bold + err);
					}
				})

			}else{
				console.log('franchises - delete - No se encontro el franchise ( ' + req.body.franchise_id +' )');
			}
		}else{
			console.log('franchises - delete - '.red.bold + err);
		}

  });

}
