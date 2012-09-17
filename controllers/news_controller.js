var NewModel = require('../models/new').NewModel;


exports.list = function (user_id) {
	console.log(user_id);
	var query = NewModel.find({ to_user: user_id });
	query.exec(function (err, news) {

		if (err) return handleError(err);
		return news;
	});
	return 'No encontro';
}