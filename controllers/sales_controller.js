var SaleModel = require('../models/sale').SaleModel;
var DealModel = require('../models/deal').DealModel;
var CouponModel = require('../models/coupon').CouponModel;

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
        for (var i = 1; i < deal.max_coupons_by_user ; i++) {
          list[i-1] = i;
        };
        res.render('sales/checkout', {title: 'Detalle del pedido', deal : deal , list : list, user:req.session.user});
      }else{
        res.render('sales/checkout', {title: 'Error'});
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
  CouponModel.findById( req.params.id , function(err, deal){
    if(!err){
      if(deal){
        var sale_new = new DealModel();
        sale_new.payment_method = 'Test Bank';
        sale_new.status = 'Pending';
        sale_new.user = req.session.user._id;

        for(var i=1;i<=quantity;i++){
          var coupon_new = new CouponModel();
          coupon_new.code = 'AAR1521';
          sale_new.status = 'unredeemed';
          sale_new.coupons.push(coupon_new);
        }

        deal.sales.push(sale_new);

        deal.save(function (err) {
            if (!err) {
              console.log('deals - add - Guardo una nueva deal');
              console.log('deals - add - Redirecciono a deals/create');
              res.render('deals/view', {title: 'Deals View', user: req.session.user});
            } else {
              console.log('deals - add - '.red.bold + err);
              console.log('deals - add - Redirecciono a /');
              res.redirect('/');
            }

          });
     }else{
        res.render('sales/checkout', {title: 'Error'});
      }
    }else{
    }
  });
  res.render('users/dashboard', {title: 'Todo ok', user: req.session.user});
}
