var EventModel = require('../models/event').EventModel;

exports.initialize = function (req, res, next) {
 
  var event_new = new EventModel();
 
  event_new.name = 'Bought'
  event_new.body = 'Ha comprado la oferta %d'
  event_new.type = 'Deal'

  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });

  var event_new = new EventModel();
 
  event_new.name = 'Commission'
  event_new.body = 'El usuario %s Ha comprado la oferta %d, has recibido %a en concepto de comisión'
  event_new.type = 'Commission'

  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });

   
}
