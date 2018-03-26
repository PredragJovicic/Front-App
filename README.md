# Front app

## Description 

In index html, there is navigation and div "main" in which components are loaded.
The components are in the compnents folder, and the javascript for each component is in the js folder and is named as a component.
After loading the componente into the main div in index.html, a javascript that controls the component is created - retrieved from the js folder.

The main.js file in the js folder controls the operation of the application, it creates an app object that contains the basic variables, then the logic for
setting and reading cookies, checking whether the user is logged and what is the level of priority, the basic routing logic, and the logic for loading components
and javascript.

When loading on the screen, a darkened giant appears when the contents are fully loaded.

The app main.js app contains the api_key to access the server and the api_token that is set when the user logs in.

### Set application

Since an application uses absolute links it is necessary to modify it:

js/main.js
```
var app = {
	
	api_key: "EgsIQjGV6oodeYMjJ0KD94Zmb8FsckXn5WHVb7OVwWp6bBnCeF2Vhj2aYmY7",
    api_token: appapi_token,
	admin : appadmin,
	user_id : appuser_id,
	div : document.getElementById('main'),
	url : "http:// { this application url  } /",
	server : 'http:// { rest application url }/public/api/',
	serverimg : 'http://{ rest application url }/restapp/public/',
	xhr : new XMLHttpRequest(),
	route : new Map(),
	GET : new Map(),
	
}
```
index.html
```
<head>
	<link rel="stylesheet" href="http://{ this application url }/dist/css/style.css" />
</head>
<body>
<nav>
	<a class="navbar-brand" href="http://{ this application url }/">Home</a>
	<li ><a class="nav-link navadmin" href="http://{ this application url }/addAgency">Add Agency</a></li>	
	<li><a class="nav-link navadmin" href="http://{ this application url }/addContact">Add Contact</a></li>		
	<li><a class="nav-link navuser" href="http://{ this application url }/editContact">Edit Contact</a></li>	
</nav>
	<img src="http://{ this application url }/dist/img/ajax-loader.gif"  id="loadingajax1"  alt="Agency"/>
	<script src="http://{ this application url }/js/main.js"></script>
</body>
```
### Login 
Administrator
```
username: admin@admin.admin
password: password
```
User
```
username: brown.sven@gmail.com
password: password
```