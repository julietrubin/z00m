<?php

class Player {
	 public $id;
	 public $name;
	 public $score;
	 
	 function __construct($ID, $NAME) {
	 	$this->id = $ID;
	 	$this->name = $NAME;
	 	$this->score = 0;
	 }
}

?>