
U index html nalazi navigacija i div "main" u koji se ucitavaju komponente.
Komponente se nalaze u folderu compunents a javascript za svaku komponentu ee nalazi u folderu js i istog je naziva kao komponenta.
Nakon ucitavanja componente u main div u index.html se kreira javascript koji kontrolice komponentu - povlaci se iz foldera js.

File main.js u folderu js kontrolise rad aplikacije, tu se kreira app objekt u kome se nalaze osnovne app varijable, zatim logika za 
setovanje i citanje cookie-a, provera dali je user logovan i koji je nivo prioriteta, logika za bazicno rutiranje i ucitavanje komponenti
 i javascripta.

Prilikom ucitavanja na ekranu se pojavljuje zatamljeni div koji se sklanja kad se sadrzaj ucita potpuno

U app objektu file main.js se nalaze api_key za pristup serveru i api_token koji se setuje kad se user uloguje.

Posto aplikacija koristi apsoplutne linkove potrevno je izmeniti:

js/main.js

var app = {
	
	api_key : "EgsIQjGV6oodeYMjJ0KD94Zmb8FsckXn5WHVb7OVwWp6bBnCeF2Vhj2aYmY7",
    	api_token: appapi_token,
	admin : appadmin,
	user_id : appuser_id,
	div : document.getElementById('main'),
	url : "http:// { url ove aplikacije } /",
	server : 'http:// { url rest aplikacije }/public/api/',
	serverimg : 'http://{ url rest aplikacije }/restapp/public/',
	xhr : new XMLHttpRequest(),
	route : new Map(),
	GET : new Map(),
	
}

index.html

<head>
	<link rel="stylesheet" href="http://{ url ove aplikacije }/dist/css/style.css" />
</head>
<body>
<nav>
	<a class="navbar-brand" href="http://{ url ove aplikacije }/">Home</a>
	<li ><a class="nav-link navadmin" href="http://{ url ove aplikacije }/addAgency">Add Agency</a></li>	
	<li><a class="nav-link navadmin" href="http://{ url ove aplikacije }/addContact">Add Contact</a></li>		
	<li><a class="nav-link navuser" href="http://{ url ove aplikacije }/editContact">Edit Contact</a></li>	
</nav>
	<img src="http://{ url ove aplikacije }/dist/img/ajax-loader.gif"  id="loadingajax1"  alt="Agency"/>
	<script src="http://{ url ove aplikacije }/js/main.js"></script>
</body>

