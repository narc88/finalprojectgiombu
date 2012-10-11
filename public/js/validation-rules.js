$(document).ready(function(){
  $("#deal_create").validate({
     rules: {
       "deal[title]": "required"
     },
     messages: {
       "deal[title]": "Este campo es obligatorio"
     }
  })
});