define(["jquery", "ui", "map"], function ($, ui, map) {
	'use strict';

	// Initialize map again in 100 ms becouse on some resolution the center isn't correct
	$(document).ready(function() {
		var interval = setInterval(function(){
			map.initialize();
			clearInterval(interval);
		},100);
	});

	// Change to route View
	$('#destinationsLink').bind('click', function() {
		$('#places-panel').hide();
		$('#direction-panel').hide();
		$('#destinations-panel').show();

		changeActive($(this));
		map.initialize();
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

	// When click on close Button closes the current waypoint and removes it from waypoints array
	$(document).on("click", ".closeButton", function(){
		var self = $(this),
			currentPoint = self.parent().find($('.wayPointName')).text();
		ui.removePoint(self);
		map.removePoint(currentPoint);
	});

	// Check if current waypoint is in the list, or if user input something in new waypoint field
	var itemExists = function(point) {
		if ($('.wayPointName:contains("'+ point +'")').length > 0) {
			return true;
		}

		return false;
	};

	// Calculation route on given points and showing instructions
	$('#calcRoute').click(function() {
		$('#destinations-panel').hide();
		$('#direction-panel').show();

		var start = $('#start').val(),
			end = $('#end').val(),
			selectedMode = $('#mode').val();

		map.calcRoute(start, end, selectedMode);
	});

	// Change view between route instruction and adding route points
	$('#editSearch').click(function() {
		$('#direction-panel').hide();
		$('#destinations-panel').show();
	});

	// Change to search places View
	$('#placesLink').bind('click', function() {
		$('#destinations-panel').hide();
		$('#direction-panel').hide();
		$('#places-panel').show();

		changeActive($(this));
		map.getCurrentLocation();
	});

	// Change current center of the map
	$('#setLocation').click(function() {
		map.setLocation($('#newLocation').val());
		$('#newLocation').val('');
	});

	// Find places on given criteria
	$('#findButton').click(function() {
		var radius = $('#locationDistance').val() || 1000,
			types = $("#places-container").data("kendoMultiSelect");

		map.showPlaces(radius, types.value());
	});

	// Show selected place on the map
	$(document).on("click", ".topFive-element", function(){
		var latitude = $(this).find($('.latitude')).text(),
			longitude = $(this).find($('.longitude')).text();
		map.setCenter(latitude, longitude);
	});

	// Make route from current location to selected place
	$(document).on("click", ".takeMeThereButton", function() {
		var start = map.getCurrentLocation(),
			latitude = $(this).parent().find(".endPointLatitude").text(),
			longitude = $(this).parent().find(".endPointLongitude").text(),
			end = '';

		map.calcRoute(start, end, "DRIVING", latitude, longitude);
	});

	var changeActive = function(element) {
		$('.active').removeClass('active');
		element.addClass('active');
	};
});