

//Recibe una fecha string con el formato de javascript
//Retorna un string del tipo dd/mm/yyyy
exports.date_string = function(mongo_date){

	var date = new Date(mongo_date);
	var d  = date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var m = date.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;

	return day + "/" + month + "/" + year;
}

//Recibe una fecha string con el formato de javascript
//Retorna horas y minutos en formato string del tipo HH:MM
exports.time_string = function(mongo_date){

	var date = new Date(mongo_date);
	var h = date.getHours();
	var hours = (h < 10) ? '0' + h : h;
	var m = date.getMinutes();
	var minutes = (m < 10) ? '0' + m : m;

	return hours + ":" + minutes;
}


//Recibe una fecha string con el formato dd/mm/yyyy y una hora string con el formato HH:MM y
//Retorna un objeto date
exports.date_mongo = function(date_string, time_string){
	//console.log("DATE_MONGO -> date_string : " + date_string + " -  time_string : " + time_string);
	date_array = date_string.split('/');
	date = date_array[2] + " " + date_array[1] + " " + date_array[0] + " " + time_string;

	return new Date(date);

}


exports.funcion_prueba = function(objeto){

	objeto.title = 'hola mundo';
	return objeto;
}