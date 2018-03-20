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

	var obj = {'email': document.getElementById('email').value,
			'password': document.getElementById('password').value
			}

	$.ajax({
		url: login.route,
		type: 'POST',
		data: JSON.stringify(obj),
		contentType: 'application/json',
		headers: {"Accept": "application/json","apikey": app.api_key},

		success: function(result, status) {
				
		if(status = "success"){
			login.uploadButton.innerHTML = 'Login';
			var dataall = JSON.parse(JSON.stringify(result));
			if(dataall.data != 'Check your email and password!'){
				var data = dataall.data;
				var api_token = data.api_token;
				var admin = Number(data.admin);
				var user_id = Number(data.id);

				console.log(user_id+" "+admin+" "+api_token);		
				setCookie("appuser", user_id+" "+admin+" "+api_token, 1);
				window.location.href = "./";
			}else{
				login.uploadButton.innerHTML = 'Login';
				login.massages.innerHTML = dataall.data;
			
			}
		}else{
			login.uploadButton.innerHTML = 'Login';
			login.massages.innerHTML = "Server error!";
		}
			
		}
	});

}
})();