var StoreModel = require('../models/store').StoreModel;
var BranchModel = require('../models/branch').BranchModel;
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
cloudfiles_client = cloudfiles.createClient(auth_data);

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
 console.log(req.files)
  fs.readFile(req.files.image.path, function (err, data) {
    var newPath = "D:/www/Giombu_node/giombu/public/images/Filename.jpg";
    console.log(newPath)
    fs.writeFile(newPath, data, function (err) {
       console.log(data)
      if(err){
        console.log('No GUARDADA'+err);
      }else{
       cloudfiles_client.addFile('img', { remote: 'img.jpg', local: newPath }, function (err, uploaded) {
        console.log('Guardado!!!!')
         // File has been uploaded, acá debería guardar el objeto imagen en la bd de mongo.
       });
      }
    });
  });
}

exports.upload_cloudfiles = function (data_to_crypt) { 
  
 /*	client.addFile('myContainer', { remote: 'remoteName.txt', local: 'path/to/local/file.txt' }, function (err, uploaded) {

      // File has been uploaded, acá debería guardar el objeto imagen en la bd de mongo.
    });*/
}