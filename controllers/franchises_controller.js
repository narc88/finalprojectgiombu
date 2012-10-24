var FranchiseModel = require('../models/franchise').FranchiseModel;
var FranchisorModel = require('../models/franchisor').FranchisorModel;
var colors = require('colors');


exports.create = function (req, res, next) {
	console.log('franchises - create'.cyan.bold);
	res.render('franchises/create', {title: 'Cargar Franquicia',
										user : req.session.user,
										franchisor : req.params.franchisor_id});
}

exports.add = function (req, res, next) {
	FranchisorModel.findById( req.params.franchisor_id , function(err, franchisor){
		if(!err){
			if(franchisor){
				console.log('franchises - add'.cyan.bold);
				var franchise_new = new FranchiseModel(req.param('franchise'));
				franchisor.franchises.push(franchise_new);
				franchisor.save(function (err) {
					if (!err) {
						//res.render('franchises/create', {title: 'Cargar Franquicia'});
						res.redirect('/intranet/franchisors/view/'+req.params.franchisor_id);
					} else {
						res.redirect('/');
					}
				});
			}else{
				console.log('franchisor - view - No se encontro el franchisor ( ' + req.params.franchisor_id +' )');
			}
		}else{
			console.log('franchisor - view - '.red.bold + err);
		}
  	});
}


exports.franchises_list = function(req, res, next){
	FranchiseModel.find( {} , function(err, franchises){
		if(!err){
			return franchises;
		}else{
			console.log('franchise - list - '.red.bold + err);
		}
  });
}


exports.update = function(req, res, next){

	console.log('franchises - update'.cyan.bold);
	console.log('franchises - update - Busco el franchise ( ' + req.body.franchise_id +' )');

	FranchiseModel.findById( req.body.franchise_id , function(err, franchise){
		if(!err){
			if(franchise){
				console.log('franchises - update - Se encontro el franchise ( ' + req.body.franchise_id +' )');
				
				//Edicion del franchise
				//Hacer que solo se graben los campos editados

				edited_franchise = req.param('franchise');

				console.log(edited_franchise);

				for (field in edited_franchise){
					if(edited_franchise[field] != ''){
						franchise[field] = edited_franchise[field];
						console.log('franchise - update - Edito el campo '+ field);
					}
				}



				franchise.save(function (err) {
					if (!err) {
						console.log('franchises - update - Guardo una nueva franchise');
						console.log('franchises - update - Redirecciono a franchises/create');
						console.log(franchise);
						//res.render('franchises/create', {title: 'Cargar Franquicia'});
						res.render('franchises/view', {	title: 'Franchises View',
														franchise : franchise,
														user : req.session.user
													});
					} else {
						console.log('franchises - update - '.red.bold + err);
						console.log('franchises - update - Redirecciono a /');
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


exports.edit = function(req, res, next){

	FranchiseModel.findById( req.params.id, function(err, franchise){
		
		if(!err){
			if(franchise){
				console.log('franchise - edit - franchise encontrado, redirecciono a franchises/edit');
				res.render('franchises/edit', {	title: 'franchise Edit',
												franchise : franchise,
												user : req.session.user
											});
			}else{
				console.log('franchise - edit - No se encontro el franchise ( ' + req.params.id +' )');
			}
		}else{
			
			console.log('franchise - edit - '.red.bold + err);
			res.redirect('/');
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






//Arma el menu de admin y redirecciona
exports.admin = function(req, res, next){
	console.log('intranet_admin'.cyan.bold);
	res.render('franchises/admin', {
		title : 'Menu de Franquicias',
		user: req.session.user
	});

}