if(app.admin != 0){
	window.location.href = "error";

}
/*
document.getElementById('updatecontact-form').onsubmit = function(event) {
  event.preventDefault();
console.log("Default : "+document.getElementById('password').defaultValue+" Current : "+document.getElementById('password').value);
}
*/
var myprofessions = "";

$('#loadingajax').show();

$.get( app.server+'getuser/'+app.user_id+'?api_token='+app.api_token , {

	}, function(data) {
		
		var contact = JSON.parse(JSON.stringify(data));

		$('#avatarimg').attr("src",app.serverimg+'avatar/'+contact.avatar);
		
		$('#name').val(contact.name);
		$('#email').val(contact.email);
		$('#address').val(contact.address);
		$('#phone').val(contact.phone);
		
		myprofessions = contact.professions;
		
		$('#professions').val(contact.professions);
		setProfessions();
		document.getElementById('password').value = null;
	});
	
	var update = {
	
	form : document.getElementById('updatecontact-form'),
	uploadButton : document.getElementById('editcontactbtn'),
	route : app.server+'updateuser/'+app.user_id,
	massages : document.getElementById('error'),
	
}

update.form.onsubmit = function(event) {
  event.preventDefault();
  
  update.massages.innerHTML ="";
  update.uploadButton.innerHTML = 'Updating...';

  var formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value); 
  
  if(document.getElementById('password').value != ""){
	formData.append('password', document.getElementById('password').value);
  }
  formData.append('professions', getSelectValues(document.getElementById('professions')));
  formData.append('phone', document.getElementById('phone').value);
  
  if(document.getElementById('avatar').files[0] != null){
	formData.append('avatar', document.getElementById('avatar').files[0]);
  }
  
  formData.append('api_token', app.api_token)

  var xhr = new XMLHttpRequest();
  xhr.open('POST', update.route, true);
  xhr.send(formData);
	xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 200) {
		  
		update.uploadButton.innerHTML = 'Update';
		var dataall = JSON.parse(this.responseText);
		console.log(dataall.name);
			if(dataall.name == document.getElementById('name').value){
				update.massages.innerHTML = dataall.name +" Updated succefuly";
			}else{
				update.massages.innerHTML = "Uppsss! monething went wrong";
			}
	
	  } else {
		  
	    update.uploadButton.innerHTML = 'Update';
		update.massages.innerHTML = 'An error occurred!';
		
	  }
	};

}	
	
 function setProfessions(){
$.get( app.server+'getprofessions?api_token='+app.api_token , {}, function(data) {
	
	var jsonData = JSON.parse(JSON.stringify(data));
	console.log(myprofessions);

	var professiondisplay;
	for(var i=0;i<jsonData.length;i++){
	
		if(myprofessions.includes(jsonData[i].profession) ){
			professiondisplay += '<option value="'+jsonData[i].profession+'" selected>'+jsonData[i].profession+'</option>';
		}else{
			professiondisplay += '<option value="'+jsonData[i].profession+'">'+jsonData[i].profession+'</option>';	
		}
	
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

