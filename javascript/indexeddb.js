var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dataBase = null;

function load_form (){
	
	defaul_data();
	date_parameters();
	startDB();
	
}

function startDB() {
	
	dataBase = indexedDB.open("object_c", 1);
	
	dataBase.onupgradeneeded = function (e) {

		active = dataBase.result;
		
		object_c = active.createObjectStore("eficiencias", { keyPath : 'id', autoIncrement : true });
		object_c.createIndex('by_linea', 'linea', { unique : false });
		object_c.createIndex('by_molde', 'molde', { unique : false });
		object_c.createIndex('by_empacado', 'empacado', { unique : false });
		object_c.createIndex('by_vel_real', 'vel_real', { unique : false });
		object_c.createIndex('by_rechazo', 'rechazo', { unique : false });
		object_c.createIndex('by_hour_register', 'hour_register', { unique : false });
		object_c.createIndex('by_date_register', 'date_register', { unique : false });
		object_c.createIndex('by_hour_efi', 'hour_efi', { unique : false });
		object_c.createIndex('by_message', 'message', { unique : false });
	};

	dataBase.onsuccess = function (e) {
		alert('Base de datos cargada correctamente');
		loadAll();
	};

	dataBase.onerror = function (e)  {
		alert('Error cargando la base de datos');
	};
	
}
function add() {
		
	var active = dataBase.result;
	var data = active.transaction(["eficiencias"], "readwrite");
	var object_c = data.objectStore("eficiencias");
	
	date_parameters();
	
	var request = object_c.put({
		linea : document.querySelector("#linea").value,
		molde : document.querySelector("#molde").value,
		empacado : document.querySelector("#empacado").value,
		vel_real : document.querySelector("#vel_real").value,
		rechazo : document.querySelector("#rechazo").value,
		hour_register : hour_register,
		date_register : date_register,
		hour_efi : hour_efi,
		message : document.querySelector("#message").value
	});
	
	request.onerror = function (e) {
		alert(request.error.empacado + '\n\n' + request.error.message);
	};
	
	data.oncomplete = function (e) {
		document.querySelector('#linea').value = '';
		document.querySelector('#molde').value = '';
		document.querySelector('#empacado').value = '';
		document.querySelector('#vel_real').value = '';
		document.querySelector('#rechazo').value = '';
		document.querySelector('#message').value = '';
		alert('object successfully added');
		loadAll();
	};
}

function delet(id) {

    var active = dataBase.result;
    var data = active.transaction(["eficiencias"],"readwrite");
    var object_c = data.objectStore("eficiencias");    

    var request = object_c.delete(parseInt(id));
	
	request.onerror = function (e) {
               alert('ERROR AL BORRAR\n\n' + request.error.id + '\n\n' + request.error.message);
    };
	
	data.oncomplete = function (e) {
		alert('object successfully Delet');
		loadAll();
	};
}

function load(id) {
	
	var active = dataBase.result;
	var data = active.transaction(["eficiencias"], "readonly");
	var object_c = data.objectStore("eficiencias");
	
	var request = object_c.get(parseInt(id));
	
	request.onsuccess = function () {
		
		var result = request.result;
		
		if (result !== undefined) {
			alert("ID: " + result.id + "\n\
			linea: " + result.linea + "\n\
			molde: " + result.molde + "\n\
			empacado: " + result.empacado + "\n\
			vel_real: " + result.vel_real + "\n\
			rechazo: " + result.rechazo);
		}
	};
}

function loadAll() {
	
	var active = dataBase.result;
	var data = active.transaction(["eficiencias"], "readonly");
	var object_c = data.objectStore("eficiencias");
	
	var elements = [];
	
	object_c.openCursor().onsuccess = function (e) {
		
		var result = e.target.result;
		
		if (result === null) {
			return;
		}
		
		elements.push(result.value);
		result.continue();
	};
	
	data.oncomplete = function() {
		
		var outerHTML = '';
		
		for (var key in elements) {
			
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].linea + '</td>\n\
				<td>' + elements[key].molde + '</td>\n\
				<td>' + elements[key].vel_real + '</td>\n\
				<td>' + elements[key].empacado + '</td>\n\
				<td>' + elements[key].rechazo + '</td>\n\
				<td>' + elements[key].hour_efi + '</td>\n\
				<td>' + elements[key].hour_register + '</td>\n\
				<td>' + elements[key].date_register + '</td>\n\
				<td>' + elements[key].message + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Details</button>\n\
				<td>\n\
					<button type="button" onclick="delet(' + elements[key].id + ');">Delet</button>\n\
				</td>\n\
			</tr>';
		}
		
		elements = [];
		document.querySelector("#elementsList").innerHTML = outerHTML;
	};
}

function date_parameters() {

	fecha = new Date();
	
	get_hours();
	get_day();
	get_string_data();
	
	usuario =""
	if (usuario =="ramon"){
		hour_efi = document.getElementById("hour_register").value;
		hour_register =  hour_efi + ":00:00"; //para hacer pruebas manuales, debes ingresar los datos con 2 digitos
	} else{
		hour_register =  hour_efi + ":" + minutos + ":" + segundos;
		document.getElementById("hour_register").value = hour_register;
		document.getElementById("hour_register").disabled = true;
	}
	
	hour_efi = hour_efi + ":00:00";
	date_register = fecha.getFullYear() +"-"+month+"-"+date_register;
	
	setTimeout("date_parameters()",1000);
	
}

function get_hours(){
	
	if  (fecha.getMinutes() <20) {
		hour_efi = fecha.getHours() -1;
	} else{
		hour_efi = fecha.getHours();
	}
}
 
function get_day(){
	
	if (hour_efi <7){
		date_register = fecha.getDate() -1;
	}else {
		date_register = fecha.getDate();
	}
	
}

function get_string_data(){
	
	date_register =  date_register.toString(); // -------------------- Dia --------------------
	if (date_register.length ==1) {date_register ="0" +date_register;}
	
	month =  (fecha.getMonth()+1).toString();  // -------------------- Mes --------------------
	if (month.length ==1) {month ="0" +month;}
	
	hour_efi = hour_efi.toString();  // -------------------- Hora --------------------
	if ( hour_efi.length ==1){hour_efi ="0" +hour_efi;}

	minutos = (fecha.getMinutes()).toString(); // -------------------- Minutos --------------------
	if (minutos.length ==1) {minutos ="0" +minutos;}
	
	segundos =  (fecha.getSeconds()).toString(); // -------------------- Segundos --------------------
	if (segundos.length ==1) {segundos ="0" +segundos;}
	
}


function aMayusculas(obj,id){
	
    obj = obj.toUpperCase();
    document.getElementById(id).value = obj;
	
}

function validation_efi_form(f){
	
	msg ="Favor de agregar comentario debido a que el "
	msg_confirm = "Favor de confirmar, si es correcto las piezas "
	
	if (val_linea(f)==false){return false;}
	if (val_empacado(f)==false){return false;}
	if (val_molde(f) ==false){return false;}
	if (val_vel_real(f) ==false){return false;}
	if (val_rechazo(f) ==false){return false;}
	
	add();
	
};

function val_empacado(f){
	
	if (document.querySelector('#empacado').value =="" ) {
		alert("Favor de ingresar empacado");
		return false;
	}
		
	if (document.querySelector('#empacado').value >(document.querySelector('#vel_real').value*60)) {
		if (document.querySelector('#message').value =="" ) {
			alert(msg+" empacado es mayor al fabricado");
			return false;
		}else{
			var mensaje = confirm(msg_confirm+"empacadas");
			if (mensaje) {
				//alert("¡Gracias por aceptar!");
			} else {
				return false;
			}
			
		}
		
	}
	
}
function val_rechazo(f){
	
	if (document.querySelector('#rechazo').value >document.querySelector('#empacado').value) {
		if (document.querySelector('#message').value =="" ) {
			alert(msg+" rechazo es mayor al empacado");
			return false;
		}else{
			var mensaje = confirm(msg_confirm+"rechazadas");
			if (mensaje) {
				//alert("¡Gracias por aceptar!");
			} else {
				return false;
			}
			
		}
		
	}	
	
}

function val_molde(f){
	if (document.querySelector('#molde').value =="" ) {
		alert("Favor de ingresar molde");
		return false;
	}
	
}

function val_vel_real(f){
	if (document.querySelector('#vel_real').value =="" ) {
		alert("Favor de ingresar vel_real");
		return false;
	}
	
}

function val_linea(f){
	if (document.querySelector('#linea').value =="0" ) {
		alert("Favor de ingresar linea");
		return false;
	}
	
}

function defaul_data(){
	
	document.querySelector('#rechazo').value =0;
	//document.querySelector('#horno').value ="3";
	//document.querySelector('#linea').value =31;
	//document.querySelector('#molde').value ="6194LB";
	//document.querySelector('#vel_real').value ="65";
}

/*
function loadAllByName() {
	
	var active = dataBase.result;
	var data = active.transaction(["eficiencias"], "readonly");
	var object_c = data.objectStore("eficiencias");
	var index = object_c.index('by_empacado');
	
	var elements = [];
	
	index.openCursor().onsuccess = function (e) {
		
		var result = e.target.result;
		
		if (result === null) {
			return;
		}
		
		elements.push(result.value);
		result.continue();
	};
	
	data.oncomplete = function() {
		
		var outerHTML = '';
		
		for (var key in elements) {
			
			outerHTML += '\n\
			<tr>\n\
				<td>' + elements[key].linea + '</td>\n\
				<td>' + elements[key].molde + '</td>\n\
				<td>' + elements[key].empacado + '</td>\n\
				<td>' + elements[key].rechazo + '</td>\n\
				<td>\n\
					<button type="button" onclick="load(' + elements[key].id + ');">Details</button>\n\
					<button type="button" onclick="delet(' + elements[key].id + ');">Delet</button>\n\
				</td>\n\
			</tr>';                        
		}
		
		elements = [];
		document.querySelector("#elementsList").innerHTML = outerHTML;
	};
	
}
*/
