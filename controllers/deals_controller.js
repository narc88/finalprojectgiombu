var Deal = require('../models/deal').Deal;


exports.create = function (req, res, next) {
  res.render('deals/create', {title: 'Cargar Oferta'})
}

exports.add = function (req, res, next) {
  var deal_new = new Deal();
  deal_new.title = req.body.title
  deal_new.tagline = req.body.tagline
  deal_new.slug = req.body.slug
  deal_new.characteristics = req.body.characteristics
  deal_new.conditions = req.body.conditions
  deal_new.price = req.body.price
  deal_new.special_price = req.body.special_price
  deal_new.discount = req.body.discount
  deal_new.start_date = req.body.start_date
  deal_new.end_date = req.body.end_date
  deal_new.start_redeem = req.body.start_redeem
  deal_new.end_redeem = req.body.end_redeem
  deal_new.max_coupons = req.body.max_coupons
  deal_new.max_coupons_by_user = req.body.max_coupons_by_user
  deal_new.seller_percentage = req.body.seller_percentage
  deal_new.giombu_percentage = req.body.giombu_percentage
  deal_new.promoter_percentage = req.body.promoter_percentage
  deal_new.status = req.body.status
  deal_new.sale_count = req.body.sale_count //Yo no lo pondria
  deal_new.shipping_cost = req.body.shipping_cost
  deal_new.store = req.body.store
  deal_new.seller = req.body.seller
  deal_new.franchisor = req.body.franchisor
  deal_new.franchise = req.body.franchise
  deal_new.currency = req.body.currency
  deal_new.images = req.body.images
  deal_new.save(function (err) {
    if (!err) {
      console.log(deal_new)
    } else {
      console.log("Error: - " + err)
    }
    res.redirect('/')
  })
  res.render('deals/create', {title: 'Cargar Oferta'})
}