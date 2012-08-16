var StoreModel = require('../models/store').StoreModel;
var BranchModel = require('../models/branch').BranchModel;
var fs = require('fs');

exports.upload = function (req, res, next) {
  res.render('images/upload', {title: 'Crear Store'});
}

exports.save_image = function (req, res, next) {
  console.log(req.files)
  fs.readFile(req.files.image.path, function (err, data) {
    var newPath = "D:/www/giombu_node/giombu/public/images/filename";
    console.log(newPath)
    fs.writeFile(newPath, data, function (err) {
      res.redirect("back");
      console.log('No GUARDADA'+err);
    });
});
}


