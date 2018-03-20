if(app.admin != 1){
	window.location.href = "error";

}
$('#loadingajax').show();

	var addcontact = {
	
	form : document.getElementById('addcontact-form'),
	uploadButton : document.getElementById('addcontactbtn'),
	route : app.server+'users',
	massages : document.getElementById('error'),
	file : null
	
}

addcontact.form.onsubmit = function(event) {
  event.preventDefault();
  
  addcontact.massages.innerHTML ="";
  addcontact.uploadButton.innerHTML = 'Adding...';

  var obj = {	name: document.getElementById('name').value,
				email: document.getElementById('email').value,
				password: document.getElementById('password').value,
				password_confirmation: document.getElementById('password_confirmation').value,
				agency: document.getElementById('agency').value,
				professions: getSelectValues(document.getElementById('professions')),
				phone: document.getElementById('phone').value,
				avatar: addcontact.file,
				api_token: app.api_token
			};

  	$.ajax({
		url: addcontact.route,
		type: 'POST',
		data: JSON.stringify(obj), 
		contentType: 'application/json; charset=utf-8',
		headers: {"Accept": "application/json","apikey": app.api_key},

		success: function(result, status) {
				
		if(status = "success"){
			addcontact.uploadButton.innerHTML = 'Add';
			var dataall = JSON.parse(JSON.stringify(result));
	
			if(dataall.data.name == document.getElementById('name').value){
				addcontact.massages.innerHTML = dataall.data.name +" Added succefuly";
				addcontact.form.reset();
			}else{
				addcontact.massages.innerHTML = "Uppsss! monething went wrong";
			}
		}else{
			addcontact.uploadButton.innerHTML = 'Add';
			addcontact.massages.innerHTML = 'An error occurred!';	
		}
			
		}
	});	 

}	
	
function setAgencies(){
$.get( app.server+'agencies?api_token='+app.api_token , {}, function(data) {
	
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
$.get( app.server+'professions?api_token='+app.api_token , {}, function(data) {
	
		var jsonData = JSON.parse(JSON.stringify(data));
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
		//reader.readAsDataURL(input.files[0]);
		reader.onload = function (e) {
		
			$('#avatarimg').attr('src',e.target.result);
			addcontact.file = e.target.result;
		
		}

		reader.readAsDataURL(input.files[0]);
		
		
	}
			
}

$('#avatar').change(function(){
	readURLv(this);
});
function getSelectValues(select) {
  var result = '';
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
	  result += opt.value+",";
    }
  }
  result = result.slice(0, -1);
  return result;
}
