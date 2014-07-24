define(["jquery", "async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places", "underscore", "starrating"], function ($) {
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
		topFivePlaces = [];

	var initialize = function() {
		initializeMap();
		initializeSearchFields();
		initializeDirections();
	};

	var initializeMap = function() {
		var center = new google.maps.LatLng(CENTER_LATITUDE, CENTER_LONGITUDE),
			mapOptions = {
				zoom: 7,
				center: center
			};

		directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	};

	var initializeSearchFields = function() {
		var searchFields = [];

		addFields(searchFields, ['start', 'end', 'waypoint', 'newLocation']);

		for (var i = 0, len = searchFields.length; i < len; i++) {
			searchFields[i].bindTo('bounds', map);
			searchFields[i].setTypes([]);
		}
	};

	var addFields = function(searchFields, fields) {
		for (var i = 0, len = fields.length; i < len; i++) {
			var currentField = document.getElementById(fields[i]);
			searchFields.push(new google.maps.places.Autocomplete(currentField));
		}
	};

	var initializeDirections = function() {
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('direction-panel'));

		google.maps.event.addListener(directionsDisplay, 'directions_changed',
			function() {
				computeTotalDistance(directionsDisplay.getDirections());
			});
	};

	var calcRoute = function() {
		var start = document.getElementById('start').value,
			end = document.getElementById('end').value,
			selectedMode = document.getElementById('mode').value;

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
	};

	var getPoints = function(location) {
		var points = waypts;
		return points;
	};

	var addPoint = function(point) {
		waypts.push({
			location: point,
			stopover: true
		});
	};

	var removePoint = function(point) {
		var waypoints = waypts;

		waypoints = waypoints
           .filter(function (el) {
                    return el.location !== point;
                   });

        waypts = waypoints;
	};

	var getCurrentLocation = function() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(initialLocation);
				map.setZoom(17);
			});
		}
	};

	var setLocation = function(location) {
		var geo = new google.maps.Geocoder();

		geo.geocode({'address': location},function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				var center = results[0].geometry.location;
				map.setCenter(center);
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	};

	var showPlaces = function(radius, types) {
		var service = new google.maps.places.PlacesService(map),
			request = {
				location : map.center,
				radius : radius,
				types : types
			};

		service.nearbySearch(request, callback);
	};

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

			google.maps.event.addListener(marker, 'click', function() {
				createInfoWindow(place, marker);
			});
		});

		getTopFive(places);
	}

	var getTopFive = function(places) {
		var topFive = _.chain(places)
			.filter(function(place){
				if (place.rating) {
					return true;
				}

				return false;
			})
			.sortBy(function(place) {
				return place.rating * -1;
			})
			.value();

		require("ui").addTopFive(topFive.slice(0, 5));
	};

	var createInfoWindow = function(place, marker){
		var content = '',
			title = "<strong>" + place.name + "</strong> </br>";
			
		content += title;

		if (place.vicinity) {
			var address = "<em>" + place.vicinity + "</em> </br>";
			content += address;
		}

		if (place.photos) {
			var photo = place.photos[0],
				photoUrl = photo.getUrl({
				maxWidth: photo.height,
				maxHeight: photo.width
			});

			content += '<img src=' + photoUrl + ' width = "' + photo.width/2 + ' px" height ="' + photo.height/2 + 'px"> </br>';
		}

		if (place.rating) {
			var starsWidth = 20 * place.rating;
			var rating = '<div class="star-rating rating-s rating-active"> <div class="rating-container rating-gly-star" data-content=""><div class="rating-stars" data-content="" style="width: ' + starsWidth + '%;"></div></div></div>';

			content += rating;
		}
							
		var	infowindow = new google.maps.InfoWindow({
			map: map,
			position : marker.position,
			content : content
		});
	};

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
		getPoints: getPoints,
		addPoint: addPoint,
		removePoint: removePoint,
		getCurrentLocation: getCurrentLocation,
		setLocation: setLocation,
		showPlaces: showPlaces,
		getTopFive: getTopFive
	};
});
