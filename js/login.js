(function () {
var login = {
	
	form : document.getElementById('login-form'),
	uploadButton : document.getElementById('loginbtn'),
	route : app.server+'login',
	massages : document.getElementById('error'),
	
}

login.form.onsubmit = function(event) {
  event.preventDefault();
  
  login.massages.innerHTML ="";
  login.uploadButton.innerHTML = 'Logging...';

  var formData = new FormData();
  
  formData.append('email', document.getElementById('email').value); 
  formData.append('password', document.getElementById('password').value); 


  var xhr = new XMLHttpRequest();
  xhr.open('POST', login.route, true);
  xhr.setRequestHeader("apikey", app.api_key);
  xhr.send(formData);
	xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 200) {
		  
		login.uploadButton.innerHTML = 'Login';
		var dataall = JSON.parse(this.responseText);
		if(dataall.data != 'Check your email and password!'){
		var data = dataall.data;
		var api_token = data.api_token;
		var admin = Number(data.admin);
		var user_id = Number(data.id);

		console.log(user_id+" "+admin+" "+api_token);		
		setCookie("appuser", user_id+" "+admin+" "+api_token, 1);
		window.location.href = "./";
		}
		
		login.massages.innerHTML = dataall.data;
		
	  } else {
		  
	    login.uploadButton.innerHTML = 'Login';
		login.massages.innerHTML = 'An error occurred!';
		
	  }
	};

}
})();