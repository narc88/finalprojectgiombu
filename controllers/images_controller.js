var StoreModel = require('../models/store').StoreModel;
var BranchModel = require('../models/branch').BranchModel;
var ImageModel = require('../models/image').ImageModel;
var DealModel = require('../models/deal').DealModel;

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
  res.render('images/upload', {title: 'Crear Store', user: req.session.user});

}
/*
exports.save_image = function (req, res, next) {

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
}*/

exports.save_temp = function (req, res, next) {
   fs.readFile(req.files.image.path, function (err, data) {
    var newPath = "D:/www/Giombu_node/giombu/public/images/Filename.jpg";
    fs.writeFile(newPath, data, function (err) {
      if(err){
        console.log('No GUARDADA'+err);
      }else{
        res.redirect('images/upload');
      }
    });
  });
}
/*
exports.save_image = function (req, res, next) {
  //console.log(JSON.stringify(req.files));
  //userPhoto is the value of the name attribute in the form
  DealModel.findById( req.params.id , function(err, deal){
    if(!err){
      if(deal){
          var serverPath =  req.files.image.name;
          var pathToServer = "C:/Users/Nicolas/Pictures/";
          fs.rename(
            //userPhoto is the input name
            req.files.image.path,
            pathToServer + serverPath,
            function(error){
              if(error){
                console.log(error)
                res.send({
                  error: 'File uploaded cancelled, error.'
                });
                return;
              }
              res.send({
                path: serverPath
              });
              var image_new = new ImageModel();
              image_new.filename = req.files.image.name;
              deal.images.push(image_new);
              deal.save(function (err) {
                if (!err) {
                  console.log('agrego imagen');
                  
                } else {
                  console.log('error '.red.bold + err);
                  
                }

              });
              res.redirect('intranet/deals/view/'+  req.params.id );
            })

          console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
      }else{
        console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
      }
    }else{
      console.log('deals - view - '.red.bold + err);
    }
  });

}*/
exports.save_image = function (req, res) {
   //console.log(JSON.stringify(req.files));
  //userPhoto is the value of the name attribute in the form
  var serverPath =  req.files.image.name;
  var pathToServer = "C:/Users/Nicolas/Pictures/";
  require('fs').rename(
    //userPhoto is the input name
    req.files.image.path,
    pathToServer + serverPath,
    function(error){
      if(error){
        console.log(error)
        res.send({
          error: 'File uploaded cancelled, error.'
        });
        return;
      }else{
        res.send({
          path: serverPath
        });
      }
    }
  )
}


exports.crop = function (res, req, next){
  console.log(req.body);
  var src = req.body.src;
  var name = req.body.name;
  var coords = req.body.data;
 var pathToServer = "D:/www/Giombu_node/giombu/public/images/";

  gm(pathToServer + src).crop(coords.w, coords.h, coords.x, coords.y).resize(resizeX,resizeY).write(pathToServer + 'images/cropped_' + name, function(err){
    if (!err){
      console.log("Image: " + name + " Cropped");
      res.send("success");
    } 
    else
    {
      res.send(err);
    }
  })
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