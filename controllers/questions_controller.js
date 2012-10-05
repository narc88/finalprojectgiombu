var QuestionModel = require('../models/question').QuestionModel;
var DealModel = require('../models/deal').DealModel;

exports.list = function (req, res, next) {
 DealModel.findById( req.params.id , function(err, deal){
		if(!err){
			if(deal){
				
		        QuestionModel.find({  deal: req.params.id })
				.populate('user')
				.populate('partner')
				.exec(function (err, questions) {
				  if (err) return handleError(err);
				   console.log(questions);
				    console.log(err);
				  res.render('questions/list', {title: 'Preguntas', user:req.session.user, deal:deal, questions:questions});
				})
				
			}else{
				console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}
  });
}

exports.add = function (req, res, next) {
	DealModel.findById( req.params.id , function(err, deal){
		if(!err){
			if(deal){
				var question_new = new QuestionModel();
				question_new.deal = req.params.id 
				question_new.user = req.session.user._id
			    question_new.question = req.body.question
			    question_new.save(function(err){
			    if(!err){
			        console.log(question_new);
			        QuestionModel.find({  deal: req.params.id })
					.populate('user')
					.populate('partner')
					.exec(function (err, questions) {
						  if (err) return handleError(err);
						  console.log(err);
						  console.log(questions);
						  res.render('questions/list', {title: 'Preguntas', user:req.session.user, deal:deal, questions:questions});
					})
				} else {
					console.log(err);
			        res.render('questions/list', {title: 'Preguntas', user:req.session.user,error:'No se ha podido realizar la pregunta', deal:deal, questions:questions});
			    }
			    });
			}else{
				console.log('deals - view - No se encontro el deal ( ' + req.body.deal_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}
  });
}
exports.add_answer = function (req, res, next) {
	QuestionModel.findById(req.params.id_question , function(err, question){
		if(!err){
			if(question){
				question.partner = req.session.user._id;
				question.answer = req.body.answer;
				question.save(function(err) {
				      if (!err)
				       	  res.redirect('questions/list/'+ question.deal);
				      else
				        console.log('error' + err)
				    });
			}else{
				console.log('deals - view - No se encontro encontro la pregunta  ( ' + req.params.question_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}
  });
}

exports.add_admin_answer = function (req, res, next) {
	QuestionModel.findById(req.params.id_question , function(err, question){
		if(!err){
			if(question){
				question.answer_admin = req.body.answer_admin;
				question.save(function(err) {
				      if (!err)
				       	  res.redirect('questions/list/'+ question.deal);
				      else
				        console.log('error' + err)
				    });
			}else{
				console.log('deals - view - No se encontro la pregunta ( ' + req.params.question_id +' )');
			}
		}else{
			console.log('deals - view - '.red.bold + err);
		}
  });
}