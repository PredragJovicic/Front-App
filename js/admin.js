
(function () {
	
if(app.admin != 1){
	window.location.href = "error";

}

$('#loadingajax').show();
	
	var start = 0;
	var per_page = 12;
	var doneTypingInterval = 1000;
	var paginate = false;

	function getdata(){

	paginate = true;
	var search = $('#search-agency').val();
	
		if(localStorage.scrollPositionagency){
			var scrollPositionagency = localStorage.getItem('scrollPositionagency');
			scrollPositionagency = scrollPositionagency.split(" ");
			$('#paginationcontent-agency').scrollTop(Number( scrollPositionagency[0]));
			search = scrollPositionagency[1];
			$('#search-agency').val(search);
			localStorage.removeItem('scrollPositionagency');
		}
	
	$.post( app.server+"searchagencies" , {

		search   : search,
		offset    : start,
		limit : per_page,
		api_token : app.api_token

	}, function(data) {

		$('#loading-agency').hide();
		$('#loading1-agency').hide();
		
		if(data){

			var jsonData = JSON.parse(JSON.stringify(data));
			for(var i=0;i<jsonData.length;i++){
				var counter = jsonData[i];
				var str='<div class="tdagency" id="tdagency_'+counter.id+'"><span class="pagtd">'+counter.name+'</span><span class="pagtd pull-right"><a  onclick="deleteAgency('+counter.id+');" ><span  class="glyphicon glyphicon-remove"></span></a></span><span class="pagtd pull-right"><a href="'+app.url+'editAgency/'+counter.id+'"><span class="glyphicon glyphicon-edit"></span></a></span><span class="pagtd pull-right"><a href="viewAgency/'+counter.id+'"><span class="glyphicon glyphicon-user"></span></a></span></div>';
				$('#paginationcontent-agency').append(str);
			}
			start = start + per_page;

		}

		paginate = false;
	});

	}

	$('#paginationcontent-agency').scroll(function(){
	if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight-2 && !paginate) { 
		$('#loading-agency').hide();
		$('#loading1-agency').show();
		getdata();
	}
	});

	function searchquery(){

	$('#search-agency').focus();
	var search=$('#search-agency').val();
	if( search !=''){$('#search-agency').val(search+" ");}
	var typingTimer;

	$('#search-agency').on('keyup',function(){
		clearTimeout(typingTimer);
		typingTimer=setTimeout(doneTyping,doneTypingInterval);

	});
	$('#search-agency').on('keydown',function(){

		$('#loading-agency').show();
		clearTimeout(typingTimer);

	});

	function doneTyping(){
		if(!paginate){
			start = 0;
			$('#paginationcontent-agency').html("");
			getdata();
		}
	}
	}

	$('#search-agency').click(function(){
	searchquery();
	});

	$('#paginationcontent-agency').on('click','.tdagency',function(){
	var scrollPositionagency=$('#paginationcontent-agency').scrollTop()+" "+ $('#search-agency').val();;
	localStorage.setItem('scrollPositionagency',scrollPositionagency);
	});
	
	
	getdata();


})();

(function () {
	
if(app.admin != 1){
	window.location.href = "error";

}

	var start = 0;
	var per_page = 9;
	var doneTypingInterval = 1800;
	var paginate = false;

	function getdata(){

	paginate = true;
	var search = $('#search-contact').val();
	
		if(localStorage.scrollPositioncontact){
			var scrollPositioncontact = localStorage.getItem('scrollPositioncontact');
			scrollPositioncontact = scrollPositioncontact.split(" ");
			$('#paginationcontent-contact').scrollTop(Number( scrollPositioncontact[0]));
			search = scrollPositioncontact[1];
			$('#search-contact').val(search);
			localStorage.removeItem('scrollPositioncontact');
		}
	
	$.post( app.server+"searchcontacts" , {

		search   : search,
		offset    : start,
		limit : per_page,
		api_token : app.api_token

	}, function(data) {

		$('#loading-contact').hide();
		$('#loading1-contact').hide();
		if(data){

				var jsonData = JSON.parse(JSON.stringify(data));
			for(var i=0;i<jsonData.length;i++){
				var counter = jsonData[i];
				
				
				var str='<div class="tdcontact" id="tdcontact_'+counter.id+'"><span class="pagtd">'+counter.name+'</span><span class="pagtd pull-right"><a  onclick="deleteContact('+counter.id+');" ><span  class="glyphicon glyphicon-remove"></span></a></span><span class="pagtd pull-right"><a href="'+app.url+'editContact/'+counter.id+'"><span class="glyphicon glyphicon-edit"></span></a></span><span class="pagtd pull-right"><a href="viewContact/'+counter.id+'"><span class="glyphicon glyphicon-user"></span></a></span></div>';
				
				
				//var str='<tr class="tdcontact" id="tdcontact_'+counter.id+'"><td style="width:70%;">'+counter.name+'</td><td style="width:10%;"><a href="viewContact/'+counter.id+'"><span class="glyphicon glyphicon-user"></span></a></td><td style="width:10%;"><a href="'+app.url+'editContact/'+counter.id+'"><span class="glyphicon glyphicon-edit"></span></a></td><td style="width:10%;"><a  onclick="deleteContact('+counter.id+');" ><span  class="glyphicon glyphicon-remove"></span></a></td></tr>';	
				$('#paginationcontent-contact').append(str);
			}
			start = start + per_page;

		}

		$('#loadingajax').hide();
		paginate = false;
	});

	}

	$('#paginationcontent-contact').scroll(function(){
	if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight-2 && !paginate) { 
		$('#loading-contact').hide();
		$('#loading1-contact').show();
		getdata();
	}
	});

	function searchquery(){

	$('#search-contact').focus();
	var search=$('#search-contact').val();
	if( search !=''){$('#search-contact').val(search+" ");}
	var typingTimer;

	$('#search-contact').on('keyup',function(){
		clearTimeout(typingTimer);
		typingTimer=setTimeout(doneTyping,doneTypingInterval);

	});
	$('#search-contact').on('keydown',function(){

		$('#loading-contact').show();
		clearTimeout(typingTimer);

	});

	function doneTyping(){
		if(!paginate){
			start = 0;
			$('#paginationcontent-contact').html("");
			getdata();
		}
	}
	}

	$('#search-contact').click(function(){
	searchquery();
	});

	$('#paginationcontent-contact').on('click','.tdcontact',function(){
	var scrollPositioncontact=$('#paginationcontent-contact').scrollTop()+" "+$('#search-contact').val();
	localStorage.setItem('scrollPositioncontact',scrollPositioncontact);
	});
	
	
	getdata();

})();

function deleteAgency(id){

if( confirm("Delete agency?")){	
$('#loadingajax').show();

$.get( app.server+'deleteagency/'+id+'?api_token='+app.api_token , {

	}, function(data) {
	
	$('#loadingajax').hide();
	$('#tdagency_'+id).hide();		
	
	});
}
}

function deleteContact(id){

if( confirm("Delete contact?")){	
$('#loadingajax').show();

$.get( app.server+'deleteuser/'+id+'?api_token='+app.api_token , {

	}, function(data) {
	
	$('#loadingajax').hide();
	$('#tdcontact_'+id).hide();		
	
	});
}
}
