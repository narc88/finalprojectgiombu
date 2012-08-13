var FranchisorModel = require('../models/franchisor').FranchisorModel;
var colors = require('colors');


exports.create = function (req, res, next) {
  res.render('franchisor/create', {title: ''})
}

exports.add = function (req, res, next) {

  console.log('franchisor - add'.cyan.bold);

	var franchisor_new = new FranchisorModel();

	franchisor_new.name					: req.body.name;
	franchisor_new.domain				: req.body.domain;
	franchisor_new.secure_domain		: req.body.secure_domain;
	franchisor_new.tlc					: req.body.tlc;
	franchisor_new.email				: req.body.email;
	franchisor_new.smtp					: req.body.smtp;
	franchisor_new.default_timezone		: req.body.default_timezone;
	franchisor_new.locale				: req.body.locale;
	franchisor_new.language				: req.body.language;
	franchisor_new.fanpage				: req.body.fanpage;
	franchisor_new.franchise_count		: 0;

	//Validar los objetos embebidos

	//country	   			: req.body.country;
	//currency   			: req.body.currency;
	//franchises			: req.body.franchises;



  franchisor_new.save(function (err) {
    if (!err) {
      console.log('franchisor - add - Save');
    } else {
      console.log('franchisor - add - '.red.bold + err);
      res.redirect('/');
    }
    
  });


  console.log('franchisor - add - Redirecciono a franchisor/create');
  res.render('franchisor/create', {title: ''});
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



exports.edit = function(req, res, next){

	console.log('franchisor - edit'.cyan.bold);
	console.log('franchisor - edit - Busco el franchisor ( ' + req.body.franchisor_id +' )');

	FranchisorModel.findById( req.body.franchisor_id , function(err, franchisor){
		if(!err){
			if(franchisor){
				console.log('franchisor - edit - Se encontro el franchisor ( ' + req.body.franchisor_id +' )');
				
				//Edicion del franchisor
				//Revisar cuales quieren ser editados

				franchisor.name					: req.body.name;
				franchisor.domain				: req.body.domain;
				franchisor.secure_domain		: req.body.secure_domain;
				franchisor.tlc					: req.body.tlc;
				franchisor.email				: req.body.email;
				franchisor.smtp					: req.body.smtp;
				franchisor.default_timezone		: req.body.default_timezone;
				franchisor.locale				: req.body.locale;
				franchisor.language				: req.body.language;
				franchisor.fanpage				: req.body.fanpage;
				franchisor.franchise_count		: 0;

				//Validar los objetos embebidos

				//country	   			: req.body.country;
				//currency   			: req.body.currency;
				//franchises			: req.body.franchises;



			}else{
				console.log('franchisor - edit - No se encontro el franchisor ( ' + req.body.franchisor_id +' )');
			}
		}else{
			console.log('franchisor - edit - '.red.bold + err);
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
