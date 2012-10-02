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
  event_new.body = 'El usuario %f Ha comprado la oferta %d, has recibido %a en concepto de comisión'
  event_new.type = 'Commission'

  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });

  var event_new = new EventModel();
  event_new.name = 'Commission_Seller'
  event_new.body = 'El usuario %f Ha comprado la oferta %d, has recibido %a en concepto de comisión de vendedor'
  event_new.type = 'Commission'

  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });

  var event_new = new EventModel();
  event_new.name = 'Commission_Partner'
  event_new.body = 'El usuario %f Ha comprado tu oferta %d, has recibido %a'
  event_new.type = 'Commission'

  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });

  var event_new = new EventModel();
  event_new.name = 'Bonus_Promoter'
  event_new.body = 'Has recibido %a en concepto de bono, de parte del promotor %f'
  event_new.type = 'Bonus'
  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });

  var event_new = new EventModel();
  event_new.name = 'Invitation_Accepted'
  event_new.body = 'El usuario %f ha aceptado tu invitacion, ya forma parte de tus contactos'
  event_new.type = 'Invitation'

  event_new.save(function(err){
  if(!err){
    } else {
      console.log("Error: - " + err);
    }
  });   
}
