if(app.admin != 1){
	window.location.href = "error";

}
$('#loadingajax').show();

var newagenci = {
	
	form : document.getElementById('addagency-form'),
	uploadButton : document.getElementById('addbtn'),
	route : app.server+'addagency',
	massages : document.getElementById('error'),
	
}

newagenci.form.onsubmit = function(event) {
  event.preventDefault();
  
  newagenci.massages.innerHTML ="";
  newagenci.uploadButton.innerHTML = 'Adding...';

  var formData = new FormData();
  
  formData.append('name', document.getElementById('name').value);
  formData.append('address', document.getElementById('address').value);
  formData.append('countri', document.getElementById('countri').value);
  formData.append('city', document.getElementById('city').value);
  formData.append('phone', document.getElementById('phone').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('web', document.getElementById('web').value);
  
  formData.append('api_token', app.api_token)


  var xhr = new XMLHttpRequest();
  xhr.open('POST', newagenci.route, true);
  xhr.send(formData);
	xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 201) {
		  
		newagenci.uploadButton.innerHTML = 'Add';
		var dataall = JSON.parse(this.responseText);
		console.log(dataall.name);
		if(dataall.name == document.getElementById('name').value){
			newagenci.massages.innerHTML = dataall.name +" added succefuly";
			newagenci.form.reset();
		}else{
			newagenci.massages.innerHTML = "Uppsss! monething went wrong";
		}
	
	  } else {
		  
	    newagenci.uploadButton.innerHTML = 'Add';
		newagenci.massages.innerHTML = 'An error occurred!';
		
	  }
	};

}	

var jsonData;
function setContries(){
$.get( app.server+'getcountriescities?api_token='+app.api_token , {}, function(data) {
	
		jsonData = JSON.parse(JSON.stringify(data));
		//console.log(jsonData);
		var coutresarray = [];
		for(var i=0;i<jsonData.length;i++){
			if(!coutresarray.includes(jsonData[i].country) ){
				$('#countri').append('<option value="'+jsonData[i].country+'">'+jsonData[i].country+'</option>');
				coutresarray.push(jsonData[i].country);
			}
			
		}
		$('#loadingajax').hide();
});
}
setContries();

$('#countri').change(function(){
		
	var coutry = $(this).val();

	console.log(jsonData);
	var opt;
	for(var i=0;i<jsonData.length;i++){
		if(coutry == jsonData[i].country){
			opt += '<option value="'+jsonData[i].city+'">'+jsonData[i].city+'</option>';
		}
	}
	$('#city').html(opt);	
			
});
	
