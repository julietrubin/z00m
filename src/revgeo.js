var lat; 
var lgn; 

var geoLocation; 


function reportPosition(_e, _c){

	var geocoder;
	geocoder = new google.maps.Geocoder();			
	lat = _c.Lat;
	lng = _c.Lon;
	latlng = new google.maps.LatLng(lat, lng);
	geocoder.geocode({'latLng': latlng}, function(results, status) {	
		if (status == google.maps.GeocoderStatus.OK) {
			var country; 
			var state; 
			var region; 
			var city;
			var neighborhood; 

			for(i = 0; i < results.length; i++){
				var location = results[i].address_components[0].long_name;

				switch(results[i].types[0])
				{
				case 'country': 				//country
					country = location; 
					break;	
				case 'administrative_area_level_1':	//state
					state = location;
					break;
				case 'administrative_area_level_2': //counties
					region = location; 
					break;
				case 'administrative_area_level_3': //between a county and a city 
				case 'locality':					//city or town
					city = location;
					break;	
				case 'sublocality':					//next level after city
				case 'neighborhood': 				//neighborhood
					neighborhood = location; 
					break;
				}
			}

			switch(gameState.zoom_level){
			case 0:
				geoLocation = country;
				break;
			case 1:
				geoLocation = state;
				break;
			case 2:
				geoLocation = region;
				break;
			case 3:
				geoLocation = city;
				break; 
			case 4:
				geoLocation = neighborhood;
				break; 
			}

			var node = document.getElementById("output");
			node.innerHTML = geoLocation;
			
			/*node.innerHTML = '<p> Country ' + country
			+ '</p><p> State ' + state
			+ '</p><p> Region ' + region
			+ '</p><p> City    ' + city 
			+ '</p><p> Neighborhood ' + neighborhood
			+ '</p><p>'
			+ '</p>';*/

		} else {
			alert("Geocoder failed due to: " + status);
		}
	});	
}