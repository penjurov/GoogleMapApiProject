define(["jquery", "ui"], function ($) {
	'use strict';

	$('#submitButton').click(function() {
		$('#destinations-panel').hide();
		$('#direction-panel').show();
		map.calcRoute();
	});

	$('#addButton').click(function() {
		var point = $('#waypoint').val(),
			numberOfPoints = map.points().length;
			
		if (numberOfPoints < 8 && !itemExists(point)) {
			$('#waypoint').val('');
			map.addPoint(point);
			ui.addPoint(point);
		}
	});

	$('#editSearch').click(function() {
		$('#direction-panel').hide();
		$('#destinations-panel').show();
	});

	$('#findButton').click(function() {
		var radius = $('#locationDistance').val() || 1000;

		var types = $("#places-container").data("kendoMultiSelect");
		map.getPlaces(radius, types.value());
	});

	$('#destinationsLink').bind('click', function() {
		$('#places-panel').hide();
		$('#direction-panel').hide();
		$('#destinations-panel').show();

		changeActive($(this));
		map.initialize();
	});

	$('#placesLink').bind('click', function() {
		$('#destinations-panel').hide();
		$('#direction-panel').hide();
		$('#places-panel').show();

		changeActive($(this));
		map.getCurrentLocation();
	});

	$(document).ready(function() {
		$('#direction-panel').hide();
		$('#places-panel').hide();

		var interval = setInterval(function(){
			map.initialize();
			clearInterval(interval);
		},100);
	});

	var itemExists = function(point) {
		if ($('.wayPointName:contains("'+ point +'")').length > 0 || point.length === 0) {
			return true;
		}

		return false;
	};

	var changeActive = function(element) {
		$('.active').removeClass('active');
		element.addClass('active');
	};
});