	var dstk = $.DSTK();
	
	var country_name; 
	var area_code;
	var region;
	var postal_code;
	var city;
	var latitude;
	var country_code;
	var longitude;
	var country_code3;
	var dma_code;
	
	
	
	dstk.ip2coordinates('67.169.73.113', function(result) {
		if (typeof result['error'] !== 'undefined') {
	    	alert('Error: '+result['error']);
	    	return
	  	}
	
	  	for (var ip in result) {
	  	    var info = result[ip];
	  	    country_name = info['country_name'];
	  	    area_code = info['area_code'];
			region = info['region'];
			postal_code = info['postal_code'];
			city = info['city'];
			latitude = info['latitude'];
			country_code = info['country_code'];
			longitude = info['longitude'];
			country_code3 = info['country_code3'];
			dma_code = info['dma_code'];
	  	 
	  	}
	});