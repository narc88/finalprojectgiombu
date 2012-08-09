var DealModel = require('../models/franchisor').DealModel;
var colors = require('colors');


exports.create = function (req, res, next) {
  res.render('franchisor/create', {title: ''})
}

exports.add = function (req, res, next) {

  console.log('franchisor - add'.cyan.bold);



  deal_new.save(function (err) {
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

	DealModel.findById( req.body.franchisor_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('franchisor - view - Se encontro el franchisor ( ' + req.body.franchisor_id +' )');
				res.render('franchisor/view', {title: 'Deal', deal : deal});
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
	console.log('franchisor - edit - Busco el deal ( ' + req.body.franchisor_id +' )');

	DealModel.findById( req.body.franchisor_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('franchisor - edit - Se encontro el deal ( ' + req.body.franchisor_id +' )');
				
				//Edicion del deal



			}else{
				console.log('franchisor - edit - No se encontro el deal ( ' + req.body.franchisor_id +' )');
			}
		}else{
			console.log('franchisor - edit - '.red.bold + err);
		}

  });

}


exports.delete = function(req, res, next){

	console.log('franchisor - delete'.cyan.bold);
	console.log('franchisor - delete - Busco el deal ( ' + req.body.franchisor_id +' )');

	DealModel.findById( req.body.franchisor_id , function(err, deal){
		if(!err){
			if(deal){
				console.log('franchisor - delete - Se encontro el deal ( ' + req.body.franchisor_id +' )');
				
				//Elimino el deal
				deal.remove(function(err){
					if(!err){
						console.log('franchisor - delete - Se elimina el deal ( ' + req.body.franchisor_id +' )');
					}else{
						console.log('franchisor - delete - '.red.bold + err);
					}
				})

			}else{
				console.log('franchisor - delete - No se encontro el deal ( ' + req.body.franchisor_id +' )');
			}
		}else{
			console.log('franchisor - delete - '.red.bold + err);
		}

  });

}
