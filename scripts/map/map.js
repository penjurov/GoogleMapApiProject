define(["jquery", "async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&language=en"], function ($) {
	'use strict';
	var CENTER_LATITUDE = 42.52,
		CENTER_LONGITUDE = 25.19,
		used = false,
		directionsDisplay,
		map,
		directionsService = new google.maps.DirectionsService(),
		rendererOptions = {
			draggable: true
		},
		waypts = [],
		markersArray = [],
		currentLocation,
		infowindow,
		mapPlaces;

	// Initialize map module
	var initialize = function() {
		initializeMap();
		initializeSearchFields();
		initializeDirections();
	};

	// Initialize map content
	var initializeMap = function() {
		var center = new google.maps.LatLng(CENTER_LATITUDE, CENTER_LONGITUDE),
			mapOptions = {
				zoom: 17,
				center: center
			};

		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	};



	// Initilize search fields for autocomplete
	var initializeSearchFields = function() {
		var searchFields = [];

		addFields(searchFields, ['start', 'end', 'waypoint', 'newLocation']);

		for (var i = 0, len = searchFields.length; i < len; i++) {
			searchFields[i].bindTo('bounds', map);
			searchFields[i].setTypes([]);
		}
	};

	// Add autocomplete 
	var addFields = function(searchFields, fields) {
		for (var i = 0, len = fields.length; i < len; i++) {
			var currentField = document.getElementById(fields[i]);
			searchFields.push(new google.maps.places.Autocomplete(currentField));
		}
	};

	// Initialize direction fields
	var initializeDirections = function() {
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('direction-panel'));

		google.maps.event.addListener(directionsDisplay, 'directions_changed',
			function() {
				computeTotalDistance(directionsDisplay.getDirections());
			});
	};

	// Calculating routes by start/end string points, or by start point as current location and end LatLng point
	var calcRoute = function(start, end, selectedMode, latitude, longitude) {
		directionsDisplay.setMap(map);
		if (end==='') {
			end = new google.maps.LatLng(latitude, longitude);
		}

		if (start === '') {
			start = currentLocation;
		}

		var request = {
			origin: start,
			destination: end,
			waypoints: waypts,
			optimizeWaypoints: true,
			travelMode: google.maps.TravelMode[selectedMode]
		};

		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});

		used = true;

		if (infowindow) {
			infowindow.close();
		}
	};

	var clearRoute = function() {
		directionsDisplay.setMap(null);
	};

	// Return current way points
	var getPoints = function(location) {
		var points = waypts;
		return points;
	};

	// Add way point
	var addPoint = function(point) {
		waypts.push({
			location: point,
			stopover: true
		});
	};

	// Remove selected way point
	var removePoint = function(point) {
		var waypoints = waypts;

		waypoints = waypoints
           .filter(function (el) {
                    return el.location !== point;
                   });

        waypts = waypoints;
	};


	// Retrieving current location of the user 
	var getCurrentLocation = function(zoom) {
		clearOverlays();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(currentLocation);
				map.setZoom(zoom);
			});
		}

		return currentLocation;
	};

	// Seting current center to another point by location string
	var setLocation = function(location, latitude, longitude) {
		if (latitude) {
			var center = new google.maps.LatLng(latitude, longitude);
			map.setCenter(center);
			map.setZoom(17);
		}
		else {
			var geo = new google.maps.Geocoder();

			geo.geocode({'address': location},function(results, status){
				if (status == google.maps.GeocoderStatus.OK) {
					var center = results[0].geometry.location;
					map.setCenter(center);
					map.setZoom(17);
				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
	};

	// Showing markers of selected place types on the map
	var showPlaces = function(radius, types) {
		var service = new google.maps.places.PlacesService(map),
			request = {
				location : map.center,
				radius : radius,
				types : types
			},
			topFiveByRating = [];

		clearOverlays();
		service.nearbySearch(request, callback);

		function callback(places) {
			var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
			places.forEach(function (place) {
				var icon = {
						url : place.icon || iconBase,
						scaledSize : new google.maps.Size(24, 24)
					},
					marker = new google.maps.Marker({
						map: map,
						position: place.geometry.location,
						title: place.name,
						icon: icon
					});

				markersArray.push(marker);

				google.maps.event.addListener(marker, 'click', function() {
					createInfoWindow(place, marker);
				});
			});

			mapPlaces = places;
		}
	};

	// Clear all markers;
	function clearOverlays() {
		for (var i = 0; i < markersArray.length; i++ ) {
			markersArray[i].setMap(null);
		}

		markersArray.length = 0;
	}

	// Showing all places filtered by current seach
	var getAllPlaces = function() {
		return mapPlaces;
	};

	// Creating Info Window with place name, address, photo and rating.
	// Containing information needed for Take me there button, such as current location and selected place Latitude, Longitude
	var createInfoWindow = function(place, marker){
		var content = '<div class= "infoWindow">',
			title = '<strong class="infoName">' + place.name + "</strong> </br>",
			button = document.createElement("Button");
		
		content += title;

		if (place.vicinity) {
			var address = '<em class = "infoAddress">' + place.vicinity + "</em> </br>";
			content += address;
		}

		if (place.photos) {
			var photo = place.photos[0],
					photoUrl = photo.getUrl({
					maxWidth: photo.height,
					maxHeight: photo.width
				}),
				photoHeight = photo.height,
				photoWidth = photo.width;

			while(photoHeight > 280 || photoWidth > 250) {
				photoHeight = photoHeight * 0.9;
				photoWidth = photoWidth * 0.9;
			}

			content += '<img src=' + photoUrl + ' width = "' + photoWidth + ' px" height ="' + photoHeight + 'px"> </br>';
		}

		if (place.rating) {
			var starsWidth = 20 * place.rating;
			var rating = '<div class="star-rating rating-s rating-active"> <div class="rating-container rating-gly-star" data-content=""><div class="rating-stars" data-content="" style="width: ' + starsWidth + '%;"></div></div></div>';

			content += rating;
		}
		else {
			content += '<div height = "10px"> </div>';
		}

		styleButton(button);

		content += button.outerHTML;

		var start = '<p class = "startPoint">' + currentLocation + '</p>';
		content += start;

		var latitude = '<p class = "endPointLatitude">' + place.geometry.location.k + '</p>';
		content += latitude;

		var longitude = '<p class = "endPointLongitude">' + place.geometry.location.B + '</p>';
		content += longitude;

		content += "</div>";
	
		infowindow = new google.maps.InfoWindow({
			map: map,
			position : marker.position,
			content : content,
			maxWidth: 2
		});
	};

	// Styling button
	var styleButton = function(button) {
		button.style.background='#98DCF8';
		button.style.borderRadius='5px';
		button.style.border='1px solid #98DCF8';
		button.innerText = "Take me there";
		button.className = button.className + "takeMeThereButton";
		button.addEventListener("click");
	};

	// Calculating total Distance
	var computeTotalDistance = function(result) {
		var total = 0,
			myroute = result.routes[0];

		for (var i = 0; i < myroute.legs.length; i++) {
			total += myroute.legs[i].distance.value;
		}

		total = total / 1000.0;
		document.getElementById('total').innerHTML = total + ' km';
	};

	return {
		initialize: initialize,
		calcRoute: calcRoute,
		clearRoute: clearRoute,
		getPoints: getPoints,
		addPoint: addPoint,
		removePoint: removePoint,
		getCurrentLocation: getCurrentLocation,
		setLocation: setLocation,
		showPlaces: showPlaces,
		getAllPlaces: getAllPlaces
	};
});
