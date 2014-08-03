define(["jquery", "ui", "map", "underscore"], function ($, ui, map) {
	'use strict';

	var currentWindow;

	// Initialize map again in 100 ms becouse on some resolution the center isn't correct
	$(document).ready(function() {
		var interval = setInterval(function(){
			map.initialize();
			clearInterval(interval);
		},100);
	});

	// Change to destinations View
	$('#destinationsLink').bind('click', function() {
		ui.showDestinationsPanel();
		map.clearRoute();
		changeActive($(this));
		map.getCurrentLocation(7);
	});

	// Add new waypoint in the route
	$('#addWayPoint').click(function() {
		var point = $('#waypoint').val(),
			numberOfPoints = map.getPoints().length;

		if (numberOfPoints < 8 && !itemExists(point) && point.length !== 0) {
			$('#waypoint').val('');
			map.addPoint(point);
			ui.addPoint(point);
		}
	});

	// Check if current waypoint is in the list, or if user input something in new waypoint field
	var itemExists = function(point) {
		if ($('.wayPointName:contains("'+ point +'")').length > 0) {
			return true;
		}

		return false;
	};

	// When click on close Button closes the current waypoint and removes it from waypoints array
	$(document).on("click", ".closeButton", function(){
		var self = $(this),
			currentPoint = self.parent().find($('.wayPointName')).text();
		ui.removePoint(self);
		map.removePoint(currentPoint);
	});

	// Calculation route on given points and showing instructions
	$('#calcRoute').click(function() {
		var start = $('#start').val(),
			end = $('#end').val(),
			selectedMode = $('#mode').val();

		map.calcRoute(start, end, selectedMode);
		currentWindow = 'destinations';
		ui.showDirectionsPanel();
	});

	// Change view between route instruction and adding route points
	$('#editSearch').click(function() {
		if (currentWindow === 'destinations') {
			$('#direction-panel').hide();
			$('#destinations-panel').show();
		}
		else if (currentWindow === 'places') {
			$('#direction-panel').hide();
			$('#places-panel').show();
		}
	});

	// Change the view to search places
	$('#placesLink').bind('click', function() {
		ui.showPlacesPanel();
		map.clearRoute();
		changeActive($(this));
		map.getCurrentLocation(17);
	});

	// Change current center of the map to selected new location
	$('#setLocation').click(function() {
		map.setLocation($('#newLocation').val());
		$('#newLocation').val('');
	});

	// Find places on given criteria
	$('#findButton').click(function() {
		var radius = $('#locationDistance').val() || 1000,
			types = $("#places-container").data("kendoMultiSelect"),
			places,
			topFivePlacesByRating;

		map.showPlaces(radius, types.value());

		setTimeout(function() {
			places = map.getAllPlaces();
			topFivePlacesByRating = getTopFiveByRating(places);
			ui.addTopFive(topFivePlacesByRating);
		}, 500);
	});

	// Show selected top five place on the map
	$(document).on("click", ".topFive-element", function(){
		var latitude = $(this).find($('.latitude')).text(),
			longitude = $(this).find($('.longitude')).text();
		map.setLocation('', latitude, longitude);
	});

	// Make route from current location to selected place
	$(document).on("click", ".takeMeThereButton", function() {
		var latitude = $(this).parent().find(".endPointLatitude").text(),
			longitude = $(this).parent().find(".endPointLongitude").text();

		map.calcRoute('', '', "DRIVING", latitude, longitude);
		currentWindow = 'places';
		ui.showDirectionsPanel();
	});

	$(window).resize(function(){
		var height = $(window).height() - 75;
		$('#direction-panel').height(height);
	});

	var changeActive = function(element) {
		$('.active').removeClass('active');
		element.addClass('active');
	};

	// Showing top five places by rating
	var getTopFiveByRating = function(places) {
		places = places || [];
		
		var	topFiveByRating = _.chain(places)
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

		topFiveByRating = topFiveByRating.slice(0, 5);
		return topFiveByRating;
	};
});