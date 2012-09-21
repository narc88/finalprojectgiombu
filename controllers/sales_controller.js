var SaleModel = require('../models/sale').SaleModel;
var DealModel = require('../models/deal').DealModel;
var NewModel = require('../models/new').NewModel;
var EventModel = require('../models/event').EventModel;
var CouponModel = require('../models/coupon').CouponModel;
var Encrypter = require('./encryption_controller');

/**
	 * Realiza la confirmacion de la compra para luego enviarle la informacion a quien deba procesarla
	 *
	 * @return void
	 * @author Nicolas Ronchi
**/
exports.checkout = function (req, res, next) {
	DealModel.findById( req.params.id , function(err, deal){
		if(!err){
			if(deal){
			 var list = new Array() 
			 //falta validar la cantidad de cupones comprados para ver si el tope por usuario no es mayor al remanente de cupones.
				for (var i = 1; i <= deal.max_coupons_by_user ; i++) {
					list[i-1] = i;
				};
				res.render('sales/checkout', {title: 'Detalle del pedido', deal : deal , list : list, user:req.session.user});
			}else{
			 // res.render('sales/checkout', {title: 'Error'});
			}
		}else{
		}
	});
	
}

/**
	 * Realiza el guardado de la compra
	 *
	 * @return void
	 * @author Nicolas Ronchi
**/
exports.buy = function (req, res, next) {
	DealModel.findById( req.params.id , function(err, deal){
		if(!err){
			if(deal){
				var sale_new = new SaleModel();
				sale_new.payment_method = 'Test Bank';
				sale_new.status = 'Pending';
				sale_new.user = req.session.user._id;

				for(var i=1;i<=req.body.quantity;i++){
					var coupon_new = new CouponModel();
					coupon_new.code = Encrypter.random_text_code();
					coupon_new.status = 'unredeemed';
					sale_new.coupons.push(coupon_new);
				}
				deal.sales.push(sale_new);
				deal.save(function (err) {
						if (!err) {
							//Realizo la creacion de las novedades.
						var new_new = new NewModel();          
						var query = EventModel.findOne({ 'name': 'Bought' });
						query.exec(function (err, event) {
							if (err) return handleError(err);
							new_new.event = event._id;
							new_new.to_user = req.session.user._id;
							new_new.deal = deal._id;
						
							new_new.save(function(err){
								if(!err){
									console.log(new_new);
								} else {
									console.log("Error: - " + err);
								}
						});
						});

						 res.redirect('/users/dashboard');
						} else {
							res.redirect('/');
						}

					});
		 }else{
				console.log('No encontro el deal en buy.')
			}
		}else{
			console.log('Error en buy.')
		}
	});
	
}
