var server = 'http://localhost:8888/';

var game;
var gameState; 
var player;
var playerState; 

var myDataSource; 
var intervalObj; 

var running = false; 
var playerSubmitLocation = false; 
var geoLocation; 

var zlevel = {
		0 : "Country",
		1 : "State",
		2 : "Region",
		3 : "City",
		4 :  "Neighborhood"
};

function init() {

	YUI({ filter: 'raw',
		modules:  {
			toolkit: {
				fullpath: 'http://www.datasciencetoolkit.org/scripts/jquery.dstk.js'
			}
		}
	}).use("io-xdr", "substitute", "json-parse", "node", "toolkit", "datasource-function", "datasource-polling", "datasource-get", "datasource-jsonschema", 

			function(Y) {


		//Data fetched will be displayed in a UL in the
		//element #output:
		var console = Y.one("#console");
		var articleBox = Y.one("#article");
		var tagcloud = Y.one("#tagcloud");

		//Configure the cross-domain protocol:
		var xdrConfig = {
				id:'flash', //We'll reference this id in the xdr configuration of our transaction.
				src:'yui/build/io/io.swf' //Relative path to the .swf file from the current page.
		};

		Y.io.transport(xdrConfig);

		var loginPlayer = function(o) {
			console.set("innerHTML", 'Logging in..');
			var user = Y.one("#user").get('value');
			var pwd = Y.one("#pwd").get('value');
			var url = server + "server?fn=loginPlayer&player_name=" + user;

			var cfg = {
					method: "GET",
					xdr: {
						use:'flash' //This is the xdrConfig id we referenced above.
					},
					on: {
						//Our event handlers previously defined:
						start: loginPlayerHandeler.start,
						success: loginPlayerHandeler.success,
						failure: loginPlayerHandeler.failer
					}
			};
			var obj = Y.io(
					url,
					cfg
			);
		};

		var getGameState = function() {
			var url = server + "server?fn=getGameState&game_id=" + game.id; 
			var cfg = {
					method: "GET",
					xdr: {
						use:'flash' //This is the xdrConfig id we referenced above.
					},
					on: {
						//Our event handlers previously defined:
						start: getGameStateHandeler.start,
						success: getGameStateHandeler.success,
						failure: getGameStateHandeler.failer
					}
			};
			return obj = Y.io(
					url,
					cfg
			);
		};

		myDataSource = new Y.DataSource.Function({source:getGameState});



		var startGame = function(o) {
			Y.one('#submitLocation').set('disabled', false);
			Y.one('#pass').set('disabled', false);
			Y.one('#quitGame').set('disabled', false);
			Y.one('#startGame').setStyle('display', 'none');

			console.set('innerHTML', 'Matching you with patner, Please wait..');

			/*
			 * add dma_code to parameters 
			 * 
			 */
			var url = server + "server?fn=startGame&player_id=" + player.id;

			var cfg = {
					method: "GET",
					xdr: {
						use:'flash' //This is the xdrConfig id we referenced above.
					},
					on: {
						start: gameHandeler.start,
						success: gameHandeler.success,
						failure: gameHandeler.failer
					}
			};
			var obj = Y.io(
					url,
					cfg
			);
		};


		var submit = function(o){


			var url = server + "server?fn=selectLocation&game_id=" + game.id + "&player_id=" + player.id + "&location_id="+ geoLocation
			+ "&latitude=" + lat + "&longitude=" + lng + "&zoom_level=" + gameState.zoom_level; 
			var cfg = {
					method: "GET",
					xdr: {
						use:'flash' //This is the xdrConfig id we referenced above.
					},
					on: {
						//Our event handlers previously defined:
						start: submitHandeler.start,
						success: submitHandeler.success,
						failure: submitHandeler.failer
					}
			};
			var obj = Y.io(
					url,
					cfg
			);
		};



		var pass = function(o){
			console.set('innerHTML', 'pass selected');
			var url = server + "server?fn=playerPasses&game_id=" + game.id + "&player_id=" + player.id;

			var cfg = {
					method: "GET",
					xdr: {
						use:'flash' //This is the xdrConfig id we referenced above.
					},
					on: {
						//Our event handlers previously defined:
						start: gameHandeler.start,
						success: gameHandeler.success,
						failure: gameHandeler.failer
					}
			};


			var obj = Y.io(
					url,
					cfg
			);
		};


		var quitGame = function(o){
		};





		var loginPlayerHandeler = {
				start: function (id, args) {
					$("div#panel").slideUp("slow");
				},

				success : function (id, o, args) {

					//parse JSON
					var resp = Y.JSON.parse(o.responseText);

					//From here, we simply access the JSON data from where it's provided
					//in the Yahoo! Pipes console:
					if (resp) { 
						player = resp; 
						player_State = resp.state[0]; 


						Y.one('#score').set('innerHTML', 'Score: ' + player_State.score);
						Y.one('#timer').set('innerHTML', 'Time: ');
						var startButton = Y.one('#startGame');
						startButton.setStyle('display', 'inline');
						Y.on("click", startGame, startButton);


						Y.one('#username').set('innerHTML', resp.name);		
						Y.one('#close').set('innerHTML', 'logout');
						console.set("innerHTML", 'Player logged in as ' + player.name + '[' + player.id+']');

					} else {
						console.set("innerHTML", 'Parse ERROR!');
					}
				},

				failer : function(id, args) {
					Y.log("ERROR " + id + " " + args, "info", "example");
					console.set("innerHTML", 'ERROR: ' + id + " " + args);
				}
		};



		var getGameStateHandeler = {
				start: function(id, args) {
					//console.set("innerHTML", 'Starting game..');
				},

				success: function(id, o, args) {
					//	console.set("innerHTML", 'Game started..');
					var resp = Y.JSON.parse(o.responseText);
					if(resp) {
						game = resp; 
						gameState = resp.state[0];


						if (running == false && gameState.running == true){
							var current_article = gameState.current_article[0]; 

							console.set("innerHTML", "Instructions: Skim through the article and determine its location." +"<p> Choose " + zlevel[gameState.zoom_level] + "!</p>");
							articleBox.set("innerHTML", "<h3>" + current_article.title + "</h3><p>" + current_article.body + "</p>");
							tagcloud.set("innerHTML", current_article.keywords);
							//myDataSource.clearInterval(intervalObj); // Ends polling
							running = true; 
							Y.one('#submitLocation').setStyle('display', 'inline');
							Y.one('#pass').setStyle('display', 'inline');
							Y.one('#quitGame').setStyle('display', 'inline');
						}
						else{
							if(playerSubmitLocation){
								if(gameState.waitingForPlayer){ 	//need to wait for partner to select location and disable submit button 
									Y.one('#submitLocation').setStyle('display', 'none');
									Y.one('#pass').setStyle('display', 'none');
									console.set("innerHTML", "Location " + geoLocation +" selected. Please wait for partner to choose!");
								}
								else{ 					//need to print out article and update zoom level 
									playerSubmitLocation = false; 
									Y.one('#submitLocation').setStyle('display', 'inline');
									Y.one('#pass').setStyle('display', 'inline');
									var current_article = gameState.current_article[0]; 
									var message = gameState.agree ? "Congradulations! You both chose " + geoLocation + "! Move to next zoom level!": "Sorry, Your partner did not agree on " + geoLocation + ". Here is a new article!"; 

									console.set("innerHTML", message + "<p> Select "+ zlevel[gameState.zoom_level] + "!</p>");
									articleBox.set("innerHTML", "<h3>" + current_article.title + "</h3><p>" + current_article.body + "</p>");
									tagcloud.set("innerHTML", current_article.keywords);

								}
							}
							else if(gameState.waitingForPlayer){ //notify that partner has selected locaiton 
								console.set("innerHTML",  "Hurry, Your partner has already selected a location!");
							}
						}
					}

					else {
						console.set("innerHTML", 'Parse ERROR!');
					}
				},

				failer: function(id, args) {
					console.set("innerHTML", 'ERROR: Starting Game.');
				}
		};






		var gameHandeler = {
				start: function(id, args) {
					//console.set("innerHTML", 'Starting game..');
				},

				success: function(id, o, args) {
					//	console.set("innerHTML", 'Game started..');
					var resp = Y.JSON.parse(o.responseText);
					if(resp) {


						game = resp; 
						gameState = resp.state[0];
						intervalObj = myDataSource.setInterval(800);
					} 
					else {
						console.set("innerHTML", 'Parse ERROR!');
					}
				},

				failer: function(id, args) {
					console.set("innerHTML", 'ERROR: Starting Game.');
				}
		};



		var submitHandeler = {
				start: function(id, args) {
					//console.set("innerHTML", 'Starting game..');
				},

				success: function(id, o, args) {
					//	console.set("innerHTML", 'Game started..');
					var resp = Y.JSON.parse(o.responseText);

					if(resp) {
						game = resp; 
						gameState = resp.state[0];
						playerSubmitLocation = true; 
					} 
					else {
						console.set("innerHTML", 'Parse ERROR!');
					}
				},

				failer: function(id, args) {
					console.set("innerHTML", 'ERROR: Starting Game.');
				}
		};





		//add the clickHandler as soon as the xdr Flash module has
		//loaded:
		Y.on('io:xdrReady', function() {
			var register = Y.one('#register_button');
			var login = Y.one('#login_button');
			var submitButton = Y.one('#submitLocation');
			var passButton = Y.one('#pass');
			var quitGameButton = Y.one('#quitGame');
			login.set("disabled", false);
			register.set("disabled", false);

			Y.on("click", submit, submitButton);
			Y.on("click", pass, passButton);
			Y.on("click", quitGame, quitGameButton);
			Y.on("click", loginPlayer, login);
			Y.on("click", notImplemented, register);

			console.set("innerHTML", 'Welcome to z00m! Login or register in order to play!');
		});
	}	
	);
}

function notImplemented() {
	alert('Ooops! Not implemented yet..');
}
