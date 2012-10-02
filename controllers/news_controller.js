var NewModel = require('../models/new').NewModel;
var ObjectId = require('mongoose').Types.ObjectId; 

function make_news_string(item){
   var New_String,String_Deal ;
   New_String = item.event.body;
   var deal, to_user, from_user;
   if(item.deal.title){
      deal = item.deal.title;
   }
   if( item.to_user){
      to_user =  item.to_user.name+' '+item.to_user.lname;
   }
   if(item.from_user){
      from_user = item.from_user.name+' '+item.from_user.lname;
   }

   String_Deal = New_String.replace( /%d/ , deal);
   String_UserTo = String_Deal.replace( /%t/ , to_user);
   String_UserFrom = String_UserTo.replace( /%f/ , from_user);
  
   return String_UserFrom;
}

exports.list = function (user_id) {
	var list = new Array();
	 var query = NewModel.find().where('to_user').equals(user_id).populate('to_user').populate('deal').populate('event').populate('from_user');
   query.exec(
    function (err, news) {
    if (err){
    	return handleError(err);
    } else{
        for (new_item in news){
          list[new_item] = make_news_string(news[new_item]);
        }
        console.log(list);
    }
	});
   console.log(list);
  return list;

}

