if(app.admin != 1){
	window.location.href = "error";

}

var coutry = "";
var city = "";


$('#loadingajax').show();
$.get( app.server+'agencies/'+app.GET.get('id')+'?api_token='+app.api_token , {

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
	route : app.server+'agencies/'+app.GET.get('id'),
	massages : document.getElementById('error'),
	
}

update.form.onsubmit = function(event) {
  event.preventDefault();
  
  update.massages.innerHTML ="";
  update.uploadButton.innerHTML = 'Updating...';

  	var obj = {'name': document.getElementById('name').value,
			'address': document.getElementById('address').value,		
			'countri': document.getElementById('countri').value,
			'city': document.getElementById('city').value,
			'phone': document.getElementById('phone').value,
			'email': document.getElementById('email').value,
			'web': document.getElementById('web').value,
			'api_token': app.api_token
			}

$.ajax({
    url: update.route,
    type: 'PUT',
	data: JSON.stringify(obj),
	contentType: 'application/json',
	headers: {"apikey": app.api_key},
	
    success: function(result,status) {
			
		update.uploadButton.innerHTML = 'Update';
		var dataall = JSON.parse( JSON.stringify(result));
		console.log(dataall.name);
		if(dataall.name == document.getElementById('name').value){
			update.massages.innerHTML = dataall.name +" Upadated succefuly";
		}else{
			update.massages.innerHTML = "Uppsss! monething went wrong";
		}
	
    }
});

}	
	
var jsonData;
function setContries(){
$.get( app.server+'countriescities?api_token='+app.api_token , {}, function(data) {
	
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
	
