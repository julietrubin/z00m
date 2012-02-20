<?php

include 'classes/article.php';
include 'classes/player.php';

	if(isset($_GET['fn'])) $fn = $_GET['fn'];
	if(isset($_GET['game_id'])) $game_id = $_GET['game_id'];
	if(isset($_GET['player_id'])) $player_id = $_GET['player_id'];
	if(isset($_GET['player_name'])) $player_name = $_GET['player_name'];
	if(isset($_GET['location_id'])) $location_id = $_GET['location_id'];
	
	$response = '<z00m>';
	
	$players = array();
	
	if($fn=='loginPlayer') { //params: player_name, returns player_id
		$player_id = rand(0,1000);
		$player = new Player($player_id, $player_name);
		array_push($players, $player);
		$response .= "<player><id>" . $player_id . "</id><name>" . $player_name . "</name></player>";
	}
	else if($fn=='startGame') { //param: player_id, returns game_id
		$game_id = rand(0,1000);
		$article = new Article();
		
		$response .= "<game><id>" . $game_id . "</id></game>";
		$response .= "<article><id>" . $article->id . "</id><title>" . $article->title . "</title><text>" . $article->text . "</text><keywords>" . $article->keywords . "</keywords></article>";
	}
	else if ($fn=='selectLocation') { //params: game_id, player_id, GeoPlanetLocation id
		$article = new Article();
		$response .= "<game><id>" . $game_id . "</id></game>";
		$response .= "<article><id>" . $article->id . "</id><title>" . $article->title . "</title><text>" . $article->text . "</text><keywords>" . $article->keywords . "</keywords></article>";
	}
	else if ($fn=='playerPasses') { //params: game_id, player_id
		$article = new Article();
		$response .= "<game><id>" . $game_id . "</id></game>";
		$response .= "<article><id>" . $article->id . "</id><title>" . $article->title . "</title><text>" . $article->text . "</text><keywords>" . $article->keywords . "</keywords></article>";
	}
	else if ($fn=='quitGame') { //params: game_id, player_id
		$response .= '<score>' . rand(0,1000) . '</score>';
	}
//	else if ($fn=='getNextArticle') { //params: game_id
//		$article = new Article();
//		$response .= "<game><id>" . $game_id . "</id></game>";
//		$response .= "<article><id>" . $article->id . "</id><title>" . $article->title . "</title><text>" . $article->text . "</text><keywords>" . $article->keywords . "</keywords></article>";
//	}
	else {
		$response .= "<error>unknown function call: " . $fn . "</error>";
	}
	
	$response .= '</z00m>';

	echo $response;
?>