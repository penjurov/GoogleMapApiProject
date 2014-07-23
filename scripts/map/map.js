define(["jquery", "async!https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places", "underscore"], function ($) {
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
			var center = new google.maps.LatLng(CENTER_LATITUDE, CENTER_LONGITUDE),
				mapOptions = {
					zoom: 7,
					center: center
				},
				start = (document.getElementById('start')),
				end = (document.getElementById('end')),
				waypoints = (document.getElementById('waypoint'));

			directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

			var autocompleteStart = new google.maps.places.Autocomplete(start),
				autocompleteStop = new google.maps.places.Autocomplete(end),
				autocompleteWaypoints = new google.maps.places.Autocomplete(waypoints);

			autocompleteStart.bindTo('bounds', map);
			autocompleteStart.setTypes([]);
			autocompleteStop.bindTo('bounds', map);
			autocompleteStop.setTypes([]);
			autocompleteWaypoints.bindTo('bounds', map);
			autocompleteWaypoints.setTypes([]);

			directionsDisplay.setMap(map);
			directionsDisplay.setPanel(document.getElementById('direction-panel'));

			google.maps.event.addListener(directionsDisplay, 'directions_changed',
				function() {
					computeTotalDistance(directionsDisplay.getDirections());
				});

			if (used) {
				calcRoute();
			}
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
					initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
					map.setCenter(initialLocation);
				});
			}
		};

		function computeTotalDistance(result) {
			var total = 0,
				myroute = result.routes[0];

			for (var i = 0; i < myroute.legs.length; i++) {
				total += myroute.legs[i].distance.value;
			}

			total = total / 1000.0;
			document.getElementById('total').innerHTML = total + ' km';
		}

		return Map;
	})();

	return Map;
});
