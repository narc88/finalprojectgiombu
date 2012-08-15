var FranchiseModel = require('../models/franchise').FranchiseModel;
var colors = require('colors');


exports.create = function (req, res, next) {
	console.log('franchises - create'.cyan.bold);
	res.render('franchises/create', {title: 'Cargar Franquicia'})
}

exports.add = function (req, res, next) {

	console.log('franchises - add'.cyan.bold);

	var franchise_new = new FranchiseModel(req.param('franchise'));


	franchise_new.save(function (err) {
		if (!err) {
			console.log('franchises - add - Guardo una nueva franchise');
			console.log('franchises - add - Redirecciono a franchises/create');
			//res.render('franchises/create', {title: 'Cargar Franquicia'});
			res.render('franchises/view', {title: 'Franchises View', franchises : [franchise_new]});
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


exports.list = function(req, res, next){

	console.log('franchise - list'.cyan.bold);

	franchiseModel.find( {} , function(err, franchises){
		if(!err){
			if(franchises){
				console.log('franchise - list - Se envian los franchises encontrados');
				res.render('franchises/view', {title: 'Lista de franchises', franchises : franchises});
			}else{
				console.log('franchise - list - No hay franchises');
			}
		}else{
			console.log('franchise - list - '.red.bold + err);
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


				edited_franchise = req.param('franchise');


				for (field in edited_franchise){
					if(edited_franchise[field] != ''){
						franchise[field] = edited_franchise[field];
						console.log('franchisor - edit - Edito el campo '+ field);
					}
				}



				franchise.save(function (err) {
					if (!err) {
						console.log('franchises - add - Guardo una nueva franchise');
						console.log('franchises - add - Redirecciono a franchises/create');
						//res.render('franchises/create', {title: 'Cargar Franquicia'});
						res.render('franchises/view', {title: 'Franchises View', franchises : [franchise_new]});
					} else {
						console.log('franchises - add - '.red.bold + err);
						console.log('franchises - add - Redirecciono a /');
						res.redirect('/');
					}

				});



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
