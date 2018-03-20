if(app.admin != 1){
	window.location.href = "error";

}
$('#loadingajax').show();

var newagenci = {
	
	form : document.getElementById('addagency-form'),
	uploadButton : document.getElementById('addbtn'),
	route : app.server+'agencies',
	massages : document.getElementById('error'),
	
}

newagenci.form.onsubmit = function(event) {
  event.preventDefault();
  
  newagenci.massages.innerHTML ="";
  newagenci.uploadButton.innerHTML = 'Adding...';

  var obj ={'name': document.getElementById('name').value,
		  'address': document.getElementById('address').value,
		  'countri': document.getElementById('countri').value,
		  'city': document.getElementById('city').value,
		  'phone': document.getElementById('phone').value,
		  'email': document.getElementById('email').value,
		  'web': document.getElementById('web').value,
		  'api_token': app.api_token};

		  
	
	$.ajax({
		url: newagenci.route,
		type: 'POST',
		data: JSON.stringify(obj),
		contentType: 'application/json',
		headers: {"apikey": app.api_key},

		success: function(result, status) {
				
		if(status = "success"){
			
			newagenci.uploadButton.innerHTML = 'Add';
			var dataall = JSON.parse(JSON.stringify(result));
			console.log(dataall.name);
			if(dataall.name == document.getElementById('name').value){
				newagenci.massages.innerHTML = dataall.name +" added succefuly";
				newagenci.form.reset();
			}else{
				newagenci.massages.innerHTML = "Uppsss! monething went wrong";
			}
			
		}else{
			newagenci.uploadButton.innerHTML = 'Add';
			newagenci.massages.innerHTML = 'An error occurred!';
		}
			
		}
	});	  

}	

var jsonData;
function setContries(){
$.get( app.server+'countriescities?api_token='+app.api_token , {}, function(data) {
	
		jsonData = JSON.parse(JSON.stringify(data));
		console.log(jsonData);
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
	
