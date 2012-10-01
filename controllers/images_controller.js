var StoreModel = require('../models/store').StoreModel;
var BranchModel = require('../models/branch').BranchModel;
var ImageModel = require('../models/image').ImageModel;
var fs = require('fs');
var mkdirp = require('mkdirp');
var im = require('imagemagick');
var cloudfiles = require('cloudfiles');
var auth_data = {
			    auth : {
			      username: 'matiaspiuma',
			      apiKey: '1ebdc54a97610958680e881fe082b154'
			    }
			  };
var cloudfiles_client = cloudfiles.createClient(auth_data);

exports.upload = function (req, res, next) {
  res.render('images/upload', {title: 'Crear Store'});
}

exports.save_image = function (req, res, next) {
/* var newPath = "D:\\www\\Giombu_node\\giombu\\public\\images\\Filename.jpg";
        console.log(req.files.image.path);
        console.log(newPath);
        im.crop({
            srcPath: req.files.image.path,
            dstPath: newPath,
            width:   100,
            height:  450
          }, function(err, stdout, stderr){
            if (err){
              console.log(err);
            }else{
              console.log('resized kittens.jpg to fit within 256x256px');
            }
          });
        */
  fs.readFile(req.files.image.path, function (err, data) {
    var newPath = "D:/www/Giombu_node/giombu/public/images/Filename.jpg";
    fs.writeFile(newPath, data, function (err) {
      if(err){
        console.log('No GUARDADA'+err);
      }else{
        cloudfiles_client.setAuth(function () {
            cloudfiles_client.addFile('img', { remote: 'img.jpg', local: newPath }, function (err, uploaded) {
              if(err) console.log(err);
              var image_new = new ImageModel();
              image_new.filename = 'img.jpg';
              image_new.save(function(err){
                if(!err){
                  res.redirect('images/upload');
                } else {
                  console.log("Error: - " + err);
                }
              });
            });
        });
      }
    });
  });
}

exports.erase_image = function (req, res, next) {
 
}

exports.get_image = function (container , name) { 
  cloudfiles_client.setAuth(function () {
    cloudfiles_client.getFile( container , name, function (err, file) {
                  if(err) console.log(err);
                  console.log(file);
                  console.log('Igotit!!!!')
                // File has been uploaded, acá debería guardar el objeto imagen en la bd de mongo.
              });
  });
}