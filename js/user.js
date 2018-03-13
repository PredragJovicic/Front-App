var routegu = '';
if(app.admin == 1){
	routegu = 'getuserAdminstrator/'+app.GET.get('id');
}else if(app.admin == 0){
	routegu = 'getuser/'+app.user_id;
}else{
	window.location.href = "error";
}

$('#loadingajax').show();
$.get( app.server+routegu+'?api_token='+app.api_token , {

	}, function(data) {
		
	$('#loadingajax').hide();
	var contact = JSON.parse(JSON.stringify(data));

	console.log(contact);
	$('#avatar').attr("src",app.serverimg+'avatar/'+contact.avatar);

	$('#contactname').html(contact.name);
	$('#contactdata').html('Email : '+contact.email+'<br>Professions : '+contact.professions+'<br>Phone : '+contact.phone+'<br>Agency : '+contact.agency);
		
});

