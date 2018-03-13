if(app.admin != 1){
	window.location.href = "error";

}
$('#loadingajax').show();

	var addcontact = {
	
	form : document.getElementById('addcontact-form'),
	uploadButton : document.getElementById('addcontactbtn'),
	route : app.server+'adduser',
	massages : document.getElementById('error'),
	
}

addcontact.form.onsubmit = function(event) {
  event.preventDefault();
  
  addcontact.massages.innerHTML ="";
  addcontact.uploadButton.innerHTML = 'Adding...';

  var formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value); 
  formData.append('password', document.getElementById('password').value);
  formData.append('password_confirmation', document.getElementById('password_confirmation').value);
  formData.append('agency', document.getElementById('agency').value);
  formData.append('professions', getSelectValues(document.getElementById('professions')));
  formData.append('phone', document.getElementById('phone').value);
  formData.append('avatar', document.getElementById('avatar').files[0]);
  
  formData.append('api_token', app.api_token);
  formData.append('api_key', app.api_key);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', addcontact.route, true);
  xhr.send(formData);
	xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 201) {
		  
		addcontact.uploadButton.innerHTML = 'Add';
		var dataall = JSON.parse(this.responseText);
		console.log(this.responseText);
		if(dataall.data.name == document.getElementById('name').value){
			addcontact.massages.innerHTML = dataall.data.name +" Added succefuly";
			addcontact.form.reset();
		}else{
			addcontact.massages.innerHTML = "Uppsss! monething went wrong";
		}
	
	  } else {
		  
	    addcontact.uploadButton.innerHTML = 'Add';
		addcontact.massages.innerHTML = 'An error occurred!';
		
	  }
	};

}	
	
function setAgencies(){
$.get( app.server+'getagencies?api_token='+app.api_token , {}, function(data) {
	
		var jsonData = JSON.parse(JSON.stringify(data));

		var agedisplay;
		for(var i=0;i<jsonData.length;i++){
			
			agedisplay += '<option value="'+jsonData[i].name+'">'+jsonData[i].name+'</option>';	
			
		}
		$('#agency').html(agedisplay);
		setProfessions();
});
}
 setAgencies();
 
 function setProfessions(){
$.get( app.server+'getprofessions?api_token='+app.api_token , {}, function(data) {
	
		var jsonData = JSON.parse(JSON.stringify(data));
		console.log(jsonData);

		var professiondisplay;
		for(var i=0;i<jsonData.length;i++){
			
			professiondisplay += '<option value="'+jsonData[i].profession+'">'+jsonData[i].profession+'</option>';	
			
		}
		
		$('#professions').html(professiondisplay);
		$('#loadingajax').hide();
	
});
}

function readURLv(input) {

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
		
			$('#avatarimg').attr('src',e.target.result)
		
		}

		reader.readAsDataURL(input.files[0]);
	}
			
}
$('#avatar').change(function(){
	readURLv(this);
});
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}