define(["jquery", "async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places", "underscore", "starrating", "ui"], function ($) {
	'use strict';
	var Map = (function () {
		var CENTER_LATITUDE = 42.52,
			CENTER_LONGITUDE = 25.19,
			used = false,
			directionsDisplay,
			map,
			directionsService = new google.maps.DirectionsService(),
			rendererOptions = {
				draggable: true
			};

		function Map() {
			this.waypts = [];
		}

		Map.prototype.initialize = function() {
			initializeMap();
			initializeSearchFields();
			initializeDirections();

			if (used) {
				calcRoute();
			}
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

		Map.prototype.calcRoute = function() {
			var start = document.getElementById('start').value,
				end = document.getElementById('end').value,
				selectedMode = document.getElementById('mode').value;

			var request = {
				origin: start,
				destination: end,
				waypoints: this.waypts,
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

		Map.prototype.points = function(location) {
			var points = this.waypts;
			return points;
		};

		Map.prototype.addPoint = function(point) {
			this.waypts.push({
				location: point,
				stopover: true
			});
		};

		Map.prototype.removePoint = function(point) {
			var waypoints = this.waypts;

			waypoints = waypoints
               .filter(function (el) {
                        return el.location !== point;
                       });

            this.waypts =  waypoints;
		};

		Map.prototype.getCurrentLocation = function() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					map.setCenter(initialLocation);
					map.setZoom(17);
				});
			}
		};

		Map.prototype.setLocation = function(location) {
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

		Map.prototype.getPlaces = function(radius, types) {
			var service = new google.maps.places.PlacesService(map),
				request = {
					location : map.center,
					radius : radius,
					types : types
				};

			service.nearbySearch(request, function(places) {
				var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
				console.log(places);
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
			});
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

			ui.addTopFive(topFive.slice(0, 5));
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

		return Map;
	})();

	return Map;
});
