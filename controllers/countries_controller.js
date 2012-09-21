var CountryModel = require('../models/country').countryModel;
var colors = require('colors');


exports.create = function (req, res, next) {
  res.render('countries/create', {title: 'Create country'})
}

exports.add = function (req, res, next) {

  console.log('country - add'.cyan.bold);

	var country_new = new CountryModel(req.param('country'));

	country_new.franchise_count = 0;

	// Validar los objetos embebidos
	country_new.save(function (err) {
	if (!err) {
	    console.log('country - add - Save');
		console.log('country - add - Redirecciono a countries/view');
		res.render('countries/view', {title: 'Franchises View', countries : [country]});
	} else {
	  console.log('country - add - '.red.bold + err);
	  res.redirect('/');
	}

	});

}



exports.list = function(req, res, next){

	console.log('country - list'.cyan.bold);

	CountryModel.find( {} , function(err, countries){
		if(!err){
			if(countries){
				console.log('country - list - Se envian los countries encontrados');
				res.render('countries/list', {title: 'Lista de countries', countries : countries});
			}else{
				console.log('country - list - No hay countries');
			}
		}else{
			console.log('country - list - '.red.bold + err);
		}

  });
}



exports.view = function(req, res, next){

	console.log('country - view'.cyan.bold);
	console.log('country - view - Busco el country ( ' + req.params.country_id +' )');

	CountryModel.findById( req.params.country_id , function(err, country){
		if(!err){
			if(country){
				console.log('country - view - Se encontro el country ( ' + req.params.country_id +' )');
				res.render('countries/view', {title: 'country', countries : [country]});
			}else{
				console.log('country - view - No se encontro el country ( ' + req.params.country_id +' )');
			}
		}else{
			console.log('country - view - '.red.bold + err);
		}

  });
}



exports.update = function(req, res, next){

	console.log('country - update'.cyan.bold);
	console.log('country - update - Busco el country ( ' + country_id +' )');

	var country_id = req.body.country_id;
	var edited_country = req.param('country');

	CountryModel.findById( country_id , function(err, country){
		if(!err){
			if(country){
				console.log('country - update - Se encontro el country ( ' + country_id +' )');
				
				//Edicion del country
				//Revisar cuales quieren ser editados

				for (field in edited_country){
					if(edited_country[field] != ''){
						country[field] = edited_country[field];
						console.log('country - update - Edito el campo '+ field);
					}
				}
				//Validar los objetos embebidos

				country.save(function (err) {
					if (!err) {
					    console.log('country - update - Save');
						console.log('country - update - Redirecciono a countries/view');
						res.render('countries/view', {title: 'Franchises View', countries : [country]});
					} else {
					  console.log('country - update - '.red.bold + err);
					  res.redirect('/');
					}

				});

			}else{
				console.log('country - update - No se encontro el country ( ' + country_id +' )');
			}
		}else{
			console.log('country - update - '.red.bold + err);
		}

  });

}


exports.edit = function(req, res, next){

	CountryModel.findById( req.params.country_id, function(err, country){
		
		if(!err){
			if(country){
				console.log('country - edit - country encontrado, redirecciono a countries/edit');
				res.render('countries/edit', {title: 'country Edit', country : country});
			}else{
				console.log('country - edit - No se encontro el country ( ' + req.body.country_id +' )');
			}
		}else{
			
			console.log('country - edit - '.red.bold + err);
			res.redirect('/');
		}

	});
	
}


exports.delete = function(req, res, next){

	console.log('country - delete'.cyan.bold);
	console.log('country - delete - Busco el country ( ' + req.body.country_id +' )');

	CountryModel.findById( req.body.country_id , function(err, country){
		if(!err){
			if(country){
				console.log('country - delete - Se encontro el country ( ' + req.body.country_id +' )');
				
				//Elimino el country
				country.remove(function(err){
					if(!err){
						console.log('country - delete - Se elimina el country ( ' + req.body.country_id +' )');
					}else{
						console.log('country - delete - '.red.bold + err);
					}
				})

			}else{
				console.log('country - delete - No se encontro el country ( ' + req.body.country_id +' )');
			}
		}else{
			console.log('country - delete - '.red.bold + err);
		}

  });

}
