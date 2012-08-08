var User = require('../models/user').User;


exports.register = function (req, res, next) {
  res.render('users/register', {title: 'Registro'})
}

exports.add = function (req, res, next) {
  var user_new = new User();
  var profile_new = new Profile();
  user_new.username = req.body.username
  profile_new.name = req.body.name
  profile_new.lname = req.body.lname
  user_new.email = req.body.email
  user_new.password = req.body.password
  profile_new.gender = req.body.gender
  profile_new.birthday = req.body.birthday
  profile_new.phone = req.body.phone
  profile_new.mobile = req.body.mobile
  profile_new.address = req.body.address
  profile_new.country = req.body.country
  profile_new.city = req.body.city
  profile_new.zip = req.body.zip
  user_new.profile_new.push();
  user_new.save(function (err) {
  if (!err) {
      console.log(user_new)
    } else {
      console.log("Error: - " + err)
    }
    res.redirect('/')
  })
  res.render('deals/create', {title: 'Cargar Oferta'})
}