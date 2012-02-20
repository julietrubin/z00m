var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var path = require('path');
var paperboy = require('paperboy');
var database = 'test';
var server = 'localhost';
var port = 8888;
var WEBROOT = path.join(path.dirname(__filename), 'webroot/'); //webroot

//*******************	SCHEMA DEFINITIONS	*******************//

//schema definitions
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

/***** GAME ******/
var Game = new Schema({
	id		: Number,
	players : [Player],
	started : { type: Date, default: Date.now()},
	articles: [Article],
	state	: [GameState],
	debug	: { type: String, default: 'game created'}
});

mongoose.model('Game', Game);
var Game = mongoose.model('Game');

/***** GAMESTATE ******/
var GameState = new Schema({
	running				: {type: Boolean, default: false},
	waitingForPlayer	: {type: Boolean, default: true},
	current_article		: [Article], //TODO: ? How to specify a single object?
	zoom_level			: {type: Number, default: 0},
	score				: Number,
	last_modified :  { type: Date, default: Date.now()}
});
mongoose.model('GameState', GameState);
var GameState = mongoose.model('GameState');

/***** PLAYER ******/
var Player = new Schema({
	id		: Number,
	ip		: String,
	port	: Number,
    name   	: String,
    email   : String,
    score   : Number, 
    created : { type: Date, default: Date.now()},
    last_modified :  { type: Date, default: Date.now()} 
});
mongoose.model('Player', Player);
var Player = mongoose.model('Player');

/***** ARTICLE ******/
var Article = new Schema({
	id		: Number,
	title	: String,
	body	: String,
	date	: {type: Date, default: Date.now()},
	keywords: [String],
	locations : [Location]
});

mongoose.model('Article', Article);
var Article = mongoose.model('Article');

/***** LOCATION ******/
var Location = new Schema({
	woeid		: String,
	longitude	: Number,
	latitude	: Number,
	zoom_level	: Number,
	created 	: {type: Date, default: Date.now()},
	player		: [Player]
});

mongoose.model('Location', Location);
var Location = mongoose.model('Location');

//*******************	DATABASE CONNECTIONS	*******************//

//connect to database
db = mongoose.connect('mongodb://' + server + '/' + database);
console.log('connected to database: ' + 'mongodb://' + server + '/' + database)

Article.find({}, function (err, docs) {
	console.log(docs);
});

//*******************	SERVER ENVIRONMENT	*******************//

var games = new Array();
var players = new Array();
var max_zoom_level = 4;
var debugg_count = 0;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    console.log('++client ' + req.method + ' request: ' + req.url);
    
    //retrieve client's IP and port
    var ip_address = req.connection['remoteAddress'];
    var port = req.connection['remotePort'];
    console.log('IP: ' + ip_address);
    console.log('PORT: ' + port);
    
//    console.log('++Headers: ');
//    for (myKey in req.headers) {
//    	console.log("req.headers["+myKey +"] = "+req.headers[myKey]);
//    }
//    
//    console.log('++Connection: ');
//    for (myKey in req.connection){
//    	console.log("req.connection["+myKey +"] = "+req.connection[myKey]);
//    	}
    
    if (true) { //if(req.methos=='GET') {
    
	    var params = url.parse(req.url, true).query;
	//    console.log(req.url);
	    console.log(params);
	    
	    if(params.fn=='loginPlayer') { //params: player_name
	    	var player;
	    	if(params.player_name) 
	    		player = loginPlayer(params.player_name, ip_address, port);
	    	else
	    		player = loginPlayer('anonymous', ip_address, port);
	    	
	//    	res.write('player_id: ' + player_id + '\n');
	    	res.end(JSON.stringify(player));
	    }
	    else if(params.fn=='startGame') { //param: player_id, returns game_id and first article
	    	console.log('++startGame');
	    	if(params.player_id) {
	    		var game = startGame(getPlayer(params.player_id));
	    		var article = getArticle(game.id);
//	    		game.articles.push(article);
	    		game.state[0].current_article[0] = article;
	    		
	    		game.state[0].zoom_level = 0; //TODO: should depend on the article (analysis)
	    		
	    		res.end(JSON.stringify(game));
	    	}
	    	else
	    		res.end('ERROR: no player_id.');
	    }
	    else if(params.fn=='selectLocation') { //params: game_id, player_id, (GeoPlanetLocation) location_id, latitude, longitude, (Zoom level) zoom_level
	    	if(params.game_id && params.player_id && params.location_id && params.latitude && params.longitude && params.zoom_level) {
	    		
	    		console.log('++select location:');
	    		
	    		var l = new Location();
	    		l.woeid = params.location_id;
	    		l.latitude = params.latitude;
	    		l.longitude = params.longitude;
	    		l.zoom_level = params.zoom_level;
	    		l.player = getPlayer(params.player_id);
	    		
	    		var game = getGame(params.game_id);
	    		var article = game.state[0].current_article[0];
//	    		game.articles.push(article);

	    		console.log('-game.id: ' + game.id);
	    		console.log('-article: ' + article.title + ' (' + article.id + ')');
	    		geoTagArticle(article, l);
	    		console.log("Date.now() = "+Date.now());
	    		game.state[0].last_modified = (new Date()).toString();
	    		
	//    		var flight = {
	//    				airline: 'oceanic',
	//    				number: 815,
	//    				departure: {
	//    					IATA: "SYD", time: "2004-09-22 14:55", city: "Sydney"
	//					}
	//    		};
	//    		
	//    		flight.airline = 'luluflight';
	//    		console.log('new airline: ' + flight.airline);
	    		
	    		//update game state
	    		//TODO: compare selections from different players
	    		if(params.zoom_level < max_zoom_level) {
	    			console.log('-changing zoom_level from: ' + game.state[0].zoom_level); //TODO: ARRAY! USE []
	    			game.state[0].zoom_level++;
	    			console.log('-changing zoom_level to: ' + game.state[0].zoom_level);
	    			console.log('time: ' + game.state[0].last_modified);
	    		} else {
	    			//TODO: send next article
	    			article = getArticle(game.id);
	    			game.articles.push(article);
	    			game.state[0].current_article[0] = article;
	    			game.state[0].zoom_level = 0;
	    		}
	    		res.end(JSON.stringify(game)); //TODO: BUG: game.state is NOT updated!!! 
	    	}
	    	else 
	    		res.end('Parameter Error. selectLocation Usage: game_id&player_id&location_id&latitude%longitude&zoom_level');
	    }
	    else if(params.fn=='playerPasses') {  //params: game_id, player_id
	    	if(params.game_id && params.player_id) {
	    		var game = getGame(params.game_id);
	    		var article = getArticle(game.id);
	    		game.articles.push(article);
	    		//TODO: article should be marked with pass
	    		game.state.current_article[0] = article;
	    		game.state.zoom_level = 0; //TODO: should depend on the article (analysis)
	    		game.state.last_modified = Date.now();
	    		
	    		res.end(JSON.stringify(game));
	    	}
	    	else
	    		res.end('Parameter Error. playerPasses Usage: game_id&&player_id');
	    }
	    else if(params.fn=='quitGame') { //params: game_id, player_id
	    	//TODO
	    }
	    else { 
	    	//Static file delivery
	        paperboy
	        .deliver(WEBROOT, req, res)
	        .before(function() {
	//          console.log('About to deliver: '+req.url);
	        })
	        .after(function() {
	          console.log('Delivered: '+req.url);
	        })
	        .error(function() {
	          console.log('Error delivering: '+req.url);
	        })
	        .otherwise(function() {
	          res.end('File or command not found: ' + req.url);
	          console.log('Requested file not found: ' + req.url);
	        });
	    }
    } else if (req.method=="POST"){ //req.method == POST
    	console.log('**HANDLE POST REQUEST');
    	//collect post data
    	req.addListener("data", function(chunk) {
    		req.content += chunk;
    	});
    	req.addListener("end", function() {
    		//parse req.content and do stuff with it
    		console.log('post data: ' + req.content);
    		var params = req.content.split('&');
    		if(params[0].split('=')[1]=='addArticle') {
    			console.log('++add article: ' + params[2].split('=')[1]);
    			var id = params[1].split('=')[1];
    			var title = params[2].split('=')[1];
    			var body = params[3].split('=')[1];
    			var keywords = params[4].split('=')[1].split(',');
    			
    			var article = new Article({id : id, title : title, body : body, date : Date.now(), keywords : keywords}); // create a new document.
    			console.log('id: ' + article.id);
    			console.log('title: ' + article.title);
    			console.log('body: ' + article.body);
    			console.log('date: ' + article.date);
    			console.log('keywords: ' + article.keywords);
    			console.log('locations: ' + article.locations);
    			
    			//TODO: save does not work (only once >> re-step!)
    			var success = true;
    			article.save(function (err) {
    				console.log('ERROR saving article: ' + err);
    				success = false;
    			});
    			if(success)
    				console.log('--article saved: ');
    			else
    				console.log('--saving article failed.');
    		}
    	});
    	
    	res.end('Post request received');
    }
    
}).listen(port, server);
console.log('Server running at ' + server + ':' + port);

//*******************	HELPERS	*******************//

function getPlayer(player_id) {
	return players[player_id];
}

function getGame(game_id) {
//	console.log('++function call: getGame');
	return games[game_id];
//	var g = games[game_id];
//	g.debug = debugg_count;
//	debugg_count++;
//	g.state.modified = Date.now();
//	return g;
//	var g = new Game();
//	g.id = games[game_id].id;
//	g.players = games[game_id].players;
//	g.state = games[game_id].state;
//	g.state.last_modified = Date.now();
//	g.debug = debugg_count;
//	debugg_count++; 
//	return g;
}

//*******************	GAME FUNCTIONS	*******************//

function loginPlayer(name, ip, port) {
	var p = new Player();
	p.id = players.length;
	p.name = name;
	p.ip = ip;
	p.port = port,
	p.score = 0;
	
	players.push(p);
	console.log('--player created: ' + p.name + ' (' + p.id + ')');
	return p;
}

function startGame(player) {
	var g = new Game();
	g.id = games.length;
	console.log('adding player: ' + player.name + ' to game: ' + g.id);
	g.players.push(player);
	g.state = new GameState();
	g.debug = 'game modified 1';
	
	//TODO: this should be called in joinGame when players are paired up
	g.state.running = true;
		
	games.push(g);
	console.log('--game created: ' + g.id);
	return g;
}

function joinGame(player) {
	//look through games and identify the first that is waiting for a player
	for(var i=0; i<games.length; i++) {
		if (games[i].state.waitingForPlayer) {
			games[i].players.push(player);
			games[i].state.waitingForPlayer = false;
			//TODO: start game
			games[i].state.running = true;
		}
	}
}

var article_count = 0;
function getArticle(game_id) { //param: game_id in order to avoid duplicates
	
	//TODO: compare articles in game object to retrieved article
//	for(var i=0; i<games.length; i++) {
//		
//	}
	
	var a = new Article();
	
	switch(article_count % 3) {
	case 0:
		a.id = 1337;
		a.title = 'State launches safety investigation into Muni light rail';
		a.body = "The San Francisco Municipal Transportation Agency may have repeatedly violated federal, state and local rail safety regulations, 'resulting in unsafe operations and endangering Muni passengers,' according to preliminary findings from a state investigation released today. The California Public Utilities Commission, which regulates rail transit operations in the state, said its staff turned up the alleged violations during more than 20 inspections conducted between July 2009 and January of this year. The inspectors allegedly found numerous track defects and problems with the automatic train control system that runs trains in the subway. In addition, state regulators say that Muni officials have not responded quickly enough to address the concerns. The commission announced today that it launched a formal investigation. 'Our safety inspectors allege a number of deficiencies in Muni's operations and we must now determine whether SFMTA's behavior violates the law, and if so, whether fines and penalties are appropriate,' said California Public Utilities Commission President Michael Peevey. Muni's chief of transit operations, John Haley, said he was 'very surprised and extremely disappointed by the actions,' of the state regulators. He said Muni has been working closely with the CPUC and has either already has taken action to remedy the problems, or has plans to address the outstanding problems by next month.Muni officials have scheduled a press briefing for later today to address the specific allegations."
		a.keywords = ['MUNI', 'Transportation', 'safety', 'California Public Services'];
		break;
	case 1:
		a.id = 1338;
		a.title = "F.B.I. Says It Has Arrested the 'Holiday Bandit'";
		a.body = "A Ukrainian immigrant whose recent string of bank robberies earned him a place among the F.B.I.'s most wanted and the nickname 'the Holiday Bandit' was arrested early Tuesday in Queens, an F.B.I. spokesman said. Investigators said they believed that the suspect, Marat Mikhaylich, had robbed a total of nine banks during a spree that started in early December; his last robbery occurred on Monday in New Jersey, federal law enforcement officials said, at a Cathay Bank branch in Edison. The F.B.I. gave the nickname to Mr. Mikhaylich, who stands about 6-foot-5, because the heists increased in frequency at Christmastime. Mr. Mikhaylich's first seven bank robberies were all in New York City, investigators say, but his eighth was in New Jersey at the end of February. What made Mr. Mikhaylich's robberies so unusual was that the F.B.I. had publicly identified him in January, using surveillance camera images that clearly showed his face. Despite that, Mr. Mikhaylich not only remained at large but he continued to rob banks, the authorities said. A break in the case came as Mr. Mikhaylich robbed his last bank on Monday, said J. Peter Donald, an F.B.I. spokesman, who added that the suspect also stole a gold-colored Toyota Camry. After receiving a tip that a similar car was spotted in Queens this morning, investigators were able to track down Mr. Mikhaylich, Mr. Donald said, adding that Mr. Mikhyalich was arrested 'without incident.' 'The car was a factor in breaking the case,' Mr. Donald said. Mr. Mikhaylich is expected to appear in Federal District Court in Brooklyn later Tuesday.";
		a.keywords = ['Robbery', 'F.B.I'];
		break;
	case 2:
		a.id = 1339;
		a.title = "Stop talking about clients, lawyer tells Miami police chief"
		a.body = "For months, Miami Police Chief Miguel Exposito has fueled a political firestorm by suggesting the city's mayor is in bed with nefarious criminals linked to slot-style video gaming machines in cafeterias and markets across the city. Now two businessmen are adding another twist to the saga: They want Exposito to stop linking them to organized crime. In a cease-and-desist letter sent to the chief last week and copied to City Hall Ð a lawyer for Tomas Cabrerizo and Yoram Izhak demanded that the chief and Maj. Alfredo Alvarez stop making ÒdefamatoryÓ statements about them after the two top cops appeared on a Spanish-language news show to discuss the machines and organized crime. Glenn Widom, the lawyer for the two men, pointed out that while the men were arrested in 2004 as part of a high-profile racketeering case, federal prosecutors dropped the charges after realizing they had nothing to do with the case. ÒThey were completely exonerated,Ó Widom said in an interview. On Monday, Alvarez bristled at Widom's letter to Exposito, saying he and the chief never mentioned Cabrerizo and Izhak by name, although the news-show host did. ÒWe have never talked about them directly, but I can still technically say they were arrested and indicted on this case,Ó Alvarez said. While it's correct the two men were indicted in the case, the federal prosecutor, Juan Antonio Gonzalez, confirmed in a recent letter to Widom that once the investigation was completed, prosecutors concluded the two men had Òno criminal involvementÓ in the matter. Widom's letter to Exposito comes as the police chief and Alvarez have mounted a campaign in the Spanish-language media in the past few weeks to link gaming interests and organized crime to Miami Mayor Tomas Regalado and Hialeah Mayor Julio Robaina, who is running for county mayor. Alvarez said their purpose on the show was to show how Regalado brought in shady characters to draft an ordinance that in essence condoned illegal gambling. After the ordinance passed, Miami police seized more than 400 machines in a raid known as ÒLucky 7Ó and later complained to the FBI that Regalado had meddled in the raid. ÒHow can you bring organized crime people to do a city government ordinance? It shows a relationship,Ó Alvarez said. ÒIt shows why the mayor got pissed when we hit the machines. No one wants to print that.Ó Regalado shot back Monday at Exposito: ÒIt's time to stop, for one reason: They just keep talking and there is no investigation. The reason I know that: If there is an investigation, they can't talk about it. This is about him trying to look strong, look like he's the one running the show. Exposito and Alvarez have crusaded against the video gaming machines that dot cafeterias and markets across Miami and Hialeah. They maintain the machines are illegal games of chance, while the adult arcade industry says the games are legal because they can be mastered by skill. Last year Regalado successfully championed an ordinance, modeled after one in Hialeah, that allowed amusement machines as long as operators pay a registration fee. The ordinance stresses the machines cannot be used for gambling Ð but police feared the ordinance would be used anyway to flood the city with illegal ones.";
		a.keywords = ['Police', 'Lawyer'];
		break;
	}
	article_count++;
	console.log('--retrieving article: ' + a.id);
	return a;
}

function geoTagArticle(article, location) {
	console.log('++function call: geoTagArticle');
	console.log('article: ' + article.id);
	article.locations.push(location);
	
	//TODO: write to database
}