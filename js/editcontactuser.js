if(app.admin != 0){
	window.location.href = "error";

}

var myprofessions = "";

$('#loadingajax').show();

$.get( app.server+'users/'+app.user_id+'?api_token='+app.api_token , {

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
	route : app.server+'users/'+app.user_id,
	massages : document.getElementById('error'),
	file : null
	
}

update.form.onsubmit = function(event) {
  event.preventDefault();
  
  update.massages.innerHTML ="";
  update.uploadButton.innerHTML = 'Updating...';

  
  var obj = {	
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			professions: getSelectValues(document.getElementById('professions')),
			phone: document.getElementById('phone').value,
			api_token: app.api_token
			};
	
	if(document.getElementById('password').value != ""){
		obj.password = document.getElementById('password').value;
	}		
	if(document.getElementById('avatar').files[0] != null){
		obj.avatar = update.file;
	}		

  	$.ajax({
		url: update.route,
		type: "PUT",
		data: JSON.stringify(obj),
		contentType: 'application/json',
		headers: {"apikey": app.api_key},

		success: function(result, status) {
				
		if(status = "success"){
			update.uploadButton.innerHTML = 'Update';
			var dataall = JSON.parse(JSON.stringify(result));
	
			if(dataall.name == document.getElementById('name').value){
				update.massages.innerHTML = dataall.name +" Updated succefuly";
			
			}else{
				update.massages.innerHTML = "Uppsss! monething went wrong";
			}
		}else{
			update.uploadButton.innerHTML = 'Update';
			update.massages.innerHTML = 'An error occurred!';	
		}
			
		}
	});	 


}	
	
 function setProfessions(){
$.get( app.server+'professions?api_token='+app.api_token , {}, function(data) {
	
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
			update.file = e.target.result;
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

