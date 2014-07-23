define(["jquery", "ui"], function ($) {
	'use strict';
	$('#submitButton').click(function() {
		map.calcRoute();
	});

	$('#addButton').click(function() {
		var point = $('#waypoint').val(),
			numberOfPoints = map.points().length;
			
		if (numberOfPoints < 8 && itemDontExist(point)) {
			$('#waypoint').val('');
			map.addPoint(point);
			ui.addPoint(point);
		}
	});

	$('#editSearch').click(function() {
		$('#direction-panel').hide();
		$('#destinations-panel').show();
	});

	$(document).ready(function() {
        $("#editSearch").kendoButton();
        $("#submitButton").kendoButton();
        $("#addButton").kendoButton();
        $("#start").kendoMaskedTextBox();
        $("#waypoint").kendoMaskedTextBox();
        $("#end").kendoMaskedTextBox();
        $("#mode").kendoComboBox();

        $('#direction-panel').hide();
        $('#places-panel').hide();

		$('#submitButton').click(function() {
			$('#destinations-panel').hide();
			$('#direction-panel').show();
			map.calcRoute();
		});
	});

	$( window ).resize(function() {
		map.initialize();
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

	function itemDontExist(point) {
		if ($('.wayPointName:contains("'+ point +'")').length > 0) {
			return false;
		}

		return true;
	}

	function changeActive(element) {
		$('.active').removeClass('active');
		element.addClass('active');
	}

});