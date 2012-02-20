<?php

class Article {
	public $id = '';
	public $title;
	public $text;
	public $keywords;
	
	function __construct() {
		$this->id = rand(0,1000);
		$this->title = 'A sample article';
		$this->text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In dignissim arcu ut turpis facilisis ac imperdiet nulla cursus. In hendrerit, felis quis posuere ultrices, nulla enim tincidunt urna, a venenatis elit nulla ut arcu. Nullam at venenatis nisl. Fusce vulputate semper eleifend. Maecenas venenatis sollicitudin nulla, non varius lectus dignissim nec. In hac habitasse platea dictumst. Praesent rhoncus nunc vitae eros placerat pellentesque. Maecenas consectetur nunc at odio auctor pharetra. Praesent nisi ligula, eleifend a faucibus vitae, convallis eget sem. Sed in ligula lorem. Aliquam eget odio lorem. Suspendisse varius est quis ante auctor a elementum felis pretium. Donec lobortis gravida ipsum lacinia faucibus. Sed quis commodo lacus. Curabitur accumsan sem lacinia orci porta ut egestas odio volutpat. Nunc mattis metus nec erat rutrum rhoncus. Suspendisse aliquet auctor blandit. Aenean nisi urna, volutpat et feugiat vel, aliquam ut dolor.';
		$this->keywords = 'Lorem, ipsum, nulla, amet';
	}
}

?>