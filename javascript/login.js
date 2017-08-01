function login_user(p){ 
	var usuario=document.querySelector('#usuario').value;
	var password=document.querySelector('#password').value;

	if (usuario == "" && password == "") {
		alert("Usuario o Contraseña incorrecta");
		return false;
	}else{
		window.location="./formulario.html"; 
		alert ("Jalo");
	}
	
	
	
} 
	//if (usuario=="USUARIO1" && password=="CONTRASEÑA1") { 
		//window.location="TU_PAGINA_WEB.HTML"; 
	//} 
	
	