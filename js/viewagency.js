if(app.admin != 1){
	window.location.href = "error";

}

$('#loadingajax').show();
$.get( app.server+'getagency/'+app.GET.get('id')+'?api_token='+app.api_token , {

	}, function(data) {
		
		$('#loadingajax').hide();
		var jsonData = JSON.parse(JSON.stringify(data));
		var sgency =jsonData.agency; 
		
		$('#agencyname').html(sgency.name);
		$('#agencydata').html("Address : "+sgency.address+"<br>Coutry : "+sgency.countri+"<br>City : "+sgency.city+"<br>Phone : "+sgency.phone+"<br>Email : "+sgency.email+"<br>Web : "+sgency.web);

		for(var i =0;i<jsonData.users.length;i++){
			
		var contact =jsonData.users[i]; 
		console.log(contact);
		$('#agencycontactsdata').append('<tr><td><a href="'+app.url+'viewContact/'+contact.id+'">'+contact.name+'</a></td><td>'+contact.email+'</td><td>'+contact.professions+'</td><td>'+contact.phone+'</td></tr>');
		}
	});
