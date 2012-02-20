var server = 'http://localhost:8888/';
var player_id;
var game_id;
var score;
var user; 
var zoom_level; 
var dma_code;
var ipAddress; 
var running = false; 
var game;
var gameState; 
var intervalID;
var myDataSource; 
var intervalObj; 
var zlevel = {
		0 : "Country",
		1 : "State",
		2 : "Region",
		3 : "City",
		4 :  "Neighborhood"
};

var dstk = $.DSTK();




function init() {

	YUI({ filter: 'raw',
		modules:  {
			toolkit: {
				fullpath: 'http://www.datasciencetoolkit.org/scripts/jquery.dstk.js'
			}
		}
	}).use("io-xdr", "substitute", "json-parse", "node", "toolkit", "datasource-function", "datasource-polling", "datasource-get", "datasource-jsonschema", 
			
	function(Y) {


		//element #output:
		var console = Y.one("#console");

		//Configure the cross-domain protocol:
		var xdrConfig = {
				id:'flash', //We'll reference this id in the xdr configuration of our transaction.
				src:'yui/build/io/io.swf' //Relative path to the .swf file from the current page.
		};

		Y.io.transport(xdrConfig);
		
		var loginPlayer = function(o) {
			alert('loginPlayer()');
			console.set("innerHTML", 'Logging in..');
			user = Y.one("#user").get('value');
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
			var url = server + "server?fn=getGameState&game_id=" + game_id; 
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
			alert('startGame()');
			Y.one('#submitLocation').set('disabled', false);
			Y.one('#pass').set('disabled', false);
			Y.one('#quitGame').set('disabled', false);
			Y.one('#startGame').setStyle('display', 'none');

			console.set('innerHTML', 'Matching you with patner, Please wait..');

			/*
			 * add dma_code to parameters 
			 * 
			 */
			var url = server + "server?fn=startGame&player_id=" + player_id;

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
						running = gameState.running;

						if (running == true){
							var current_article = gameState.current_article[0]; 
							zoom_level = gameState.zoom_level; 

							console.set("innerHTML", "<h3>" + current_article.title + "</h3><p>" + current_article.body + "</p><br />"
									+"<p> Choose " + zlevel[zoom_level] + "!</p>");
							//myDataSource.clearInterval(intervalObj); // Ends polling
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




		var submitLocation = function(o){
			alert('submitLocation()');
			console.set('innerHTML', 'location selected');
			var url = server + "server?fn=selectLocation&game_id=" + game_id + "&player_id=" + player_id + "&location_id="+ geoLocation
			+ "&latitude=" + lat + "&longitude=" + lng + "&zoom_level=" + zoom_level; 

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

		var pass = function(o){
			console.set('innerHTML', 'pass selected');
			var url = server + "server?fn=playerPasses&game_id=" + game_id + "&player_id=" + player_id;

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
						player_id = resp.id;
						score = resp.score;
						console.set("innerHTML", 'Logged in as: ' + resp.name + ' (' + player_id + ')');
						ipAddress = resp.ip; 

						dstk.ip2coordinates(ipAddress, function(result) {
							if (typeof result['error'] !== 'undefined') {
								alert('Error: '+result['error']);
								return;
							}

							for (var ip in result) {
								var info = result[ip];
								alert('hulu');
								//dma_code = info['dma_code'];
							}
						});


						Y.one('#score').set('innerHTML', 'Score: ' + resp.score);
						var startButton = Y.one('#startGame');
						startButton.setStyle('display', 'inline');
						Y.on("click", startGame, startButton);

						Y.one('#submitLocation').setStyle('display', 'inline');
						Y.one('#pass').setStyle('display', 'inline');
						Y.one('#quitGame').setStyle('display', 'inline');
						Y.one('#username').set('innerHTML', resp.name);		
						Y.one('#close').set('innerHTML', 'logout');
						
					} else {
						console.set("innerHTML", 'Parse ERROR!');
					}
				},

				failer : function(id, args) {
					Y.log("ERROR " + id + " " + args, "info", "example");
					console.set("innerHTML", 'ERROR: ' + id + " " + args);
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
						game_id = resp.id;

						intervalObj = myDataSource.setInterval(800);

						/*var gameState = resp.state[0];
						running = gameState.running; 
						var waitingForPlayer = gameState.waitingForPlayer; 
						if(!running){
							alert("before call getGameStateHandeler");
							 // Starts polling
							alert("exit getGameStateHandeler");
						}

						else{
							if(waitingForPlayer == false){

							}

							score = gameState.score;
							//game_id = resp.id; 
							var current_article = gameState.current_article[0]; 
							zoom_level = gameState.zoom_level; 

							console.set("innerHTML", "<h3>" + current_article.title + "</h3><p>" + current_article.body + "</p><br />"
									+"<p> Choose " + zlevel[zoom_level] + "!</p>");
						}*/
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
		});
	}	
	);
}

function notImplemented() {
	alert('Ooops! Not implemented yet..');
}

