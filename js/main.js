
var appapi_token = null;
var appadmin = null;
var appuser_id = null;

if(checkCookie("appuser")){
	var cc = getCookie("appuser");
	var ccc =cc.split(" ");
	appuser_id = ccc[0];
	appadmin = ccc[1];
	appapi_token = ccc[2];
	
}
var app = {
	
	api_key : "EgsIQjGV6oodeYMjJ0KD94Zmb8FsckXn5WHVb7OVwWp6bBnCeF2Vhj2aYmY7",
    api_token: appapi_token,
	admin : appadmin,
	user_id : appuser_id,
	div : document.getElementById('main'),
	url : "http://192.168.33.10/resrapp/",
	server : 'http://192.168.33.10/restapp/public/api/',
	serverimg : 'http://192.168.33.10/restapp/public/',
	xhr : new XMLHttpRequest(),
	route : new Map(),
	GET : new Map(),
	
}

console.log("app.admin = "+app.admin);


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    var user = getCookie(cname);
    if (user != "") {
		return true;
    } 
	return false;
}

function loadComponent(route){
	
	app.xhr.open('GET', app.url+"components/"+route+".html", true);
	app.xhr.send();
	app.xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 200) {
		
		app.div.innerHTML = this.responseText;

		document.body.removeChild(document.getElementById("include"));
		var script = document.createElement('script');
		script.src = app.url+"js/"+route+".js";
		script.id = "include";
		document.body.appendChild(script);
	
	  } else {
		  
		app.div.innerHTML = 'An error occurred!';
		
	  }
	};
}

function findRoute(uri){
	
	console.log("uri : "+uri);
	var comp = uri.split("/");
	var proroute = "";
	var route = "/";
	var count = comp.length;
	var j=0;
	for(var i=0;i<count;i++){
		proroute +=comp[i];
		if( app.route.has(proroute)){
			route = proroute;
			j++;
		}
		proroute +="/";
	}
	
	var chectroute = false;
	if( app.route.has(route)){
		chectroute = true;
		var routegoo = app.route.get(route).split("|");
		
		if( routegoo.length ==   uri.replace(route,"").split("/").length  ){
	
			var urivalue = uri.replace(route,"").split("/");
			for(var a=j;a<count;a++){
				
				console.log(routegoo[a]+"="+urivalue[a]);
				app.GET.set(routegoo[a],urivalue[a]);
			
			}
			
		}else{
			chectroute = false;
		}
	
	}
	
	if(chectroute){
		loadComponent(routegoo[0]);
		console.log("Route : "+routegoo[0]);
	}else{
		loadComponent("error");
	}
	

}
function Route(val,dest){
	
	var res = val.split("/{");
	var route = res[0];
	if(route.slice(0, -1) == "/" && route!="/"){
		 route = route.slice(0, -1);
	}
	var key = "";
	for(var i=1;i<res.length;i++){
		key += "|"+res[i];
	} 
	
	var ext = dest+key.replace(/[}/]/g,"");
	
	app.route.set(route,ext);
}


function logout(){
	
  var formData = new FormData();
  
  formData.append('api_token', app.api_token);
  formData.append('api_key', app.api_key)
	console.log("api_key "+app.api_key);
	console.log("api_token "+app.api_token);
	
	document.getElementById('logoutbtn').innerHTML = 'Logging out...'
	
  var xhr = new XMLHttpRequest();
  xhr.open('POST', app.server+"logout", true);
  xhr.send(formData);
	xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 200) {
		   
		var dataall = JSON.parse(this.responseText);
		var data = dataall.data;		   
		document.cookie = "appuser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
		window.location.href = "./";
		
	  } else {
		  
	    alert('Server error');
	  }
	};
}

function start(){
	
	var url = window.location.href;
	var uri = url.replace(app.url,"");
	
	if(app.api_token == null){
		uri = "/";
		document.getElementById("navigation").style.display="none";
	}
	
	if(app.admin == 1){
		$('.navuser').hide();
	}else{
		$('.navadmin').hide();
	}
	
	findRoute(uri);
	

}

if(app.admin == 1){
	
	Route("/","admin");	
	Route("viewAgency/{id}","viewagency");	
	Route("addAgency","newagency");	
	Route("editAgency/{id}","editagency");	
	Route("deleteAgency/{id}","deleteagency");	
	
	Route("viewContact/{id}","user");	
	Route("addContact","newcontact");
	Route("editContact/{id}","editcontact");	
	Route("deleteContact/{id}","deletecontact");	
}else if(app.admin == 0){

	Route("/","user");
	Route("editContact","editcontactuser");	
}else{
	Route("/","login");	
	
}
	Route("login","login");
	Route("logout","logout");
	Route("error","error");


start();

