if(app.admin != 1){
	window.location.href = "error";

}

var coutry = "";
var city = "";


$('#loadingajax').show();
$.get( app.server+'getagency/'+app.GET.get('id')+'?api_token='+app.api_token , {

	}, function(data) {
		
		var jsonData = JSON.parse(JSON.stringify(data));
		var sgency =jsonData.agency; 
		$('#name').val(sgency.name);
		$('#address').val(sgency.address);
		coutry = sgency.countri;
		city = sgency.city;

		$('#phone').val(sgency.phone);
		$('#email').val(sgency.email);
		$('#web').val(sgency.web);
		
		setContries();

	});
	
	var update = {
	
	form : document.getElementById('update-form'),
	uploadButton : document.getElementById('updatebtn'),
	route : app.server+'updateagency/'+app.GET.get('id'),
	massages : document.getElementById('error'),
	
}

update.form.onsubmit = function(event) {
  event.preventDefault();
  
  update.massages.innerHTML ="";
  update.uploadButton.innerHTML = 'Updating...';

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
  xhr.open('POST', update.route, true);
  xhr.send(formData);
	xhr.onload = function () {
	  if (this.readyState == 4 && this.status == 200) {
		  
		update.uploadButton.innerHTML = 'Update';
		var dataall = JSON.parse(this.responseText);
		console.log(dataall.name);
		if(dataall.name == document.getElementById('name').value){
			update.massages.innerHTML = dataall.name +" Upadated succefuly";
		}else{
			update.massages.innerHTML = "Uppsss! monething went wrong";
		}
	
	  } else {
		  
	    update.uploadButton.innerHTML = 'Update';
		update.massages.innerHTML = 'An error occurred!';
		
	  }
	};

}	
	
var jsonData;
function setContries(){
$.get( app.server+'getcountriescities?api_token='+app.api_token , {}, function(data) {
	
		jsonData = JSON.parse(JSON.stringify(data));
		
		var coutresarray = [];
		var countrydisplay;
			var opt;
		for(var i=0;i<jsonData.length;i++){
			if(!coutresarray.includes(jsonData[i].country) ){
				if(coutry == jsonData[i].country ){
					countrydisplay += '<option value="'+jsonData[i].country+'" selected>'+jsonData[i].country+'</option>';
				}else{
					countrydisplay += '<option value="'+jsonData[i].country+'">'+jsonData[i].country+'</option>';	
				}
				coutresarray.push(jsonData[i].country);
			
			}	
		}
		$('#countri').html(countrydisplay);
		$('#city').html(opt);	

		for(var i=0;i<jsonData.length;i++){
			if(coutry == jsonData[i].country){
				if(city == jsonData[i].city){
					opt += '<option value="'+jsonData[i].city+'" selected>'+jsonData[i].city+'</option>';
				}else{
					opt += '<option value="'+jsonData[i].city+'" >'+jsonData[i].city+'</option>';
				}
			}
		}
		$('#city').html(opt);	
		
		$('#loadingajax').hide();
});
}

$('#countri').change(function(){
		
	var coutry = $(this).val();

	console.log(jsonData);
	var opt;
	for(var i=0;i<jsonData.length;i++){
		if(coutry == jsonData[i].country){
			opt += '<option value="'+jsonData[i].city+'" selected>'+jsonData[i].city+'</option>';
		}
	}
	$('#city').html(opt);	
			
});
	
