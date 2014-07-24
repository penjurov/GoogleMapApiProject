define(["jquery", "map", "places", "kendo", "handlebars"], function ($, map, places) {
	'use strict';
	var $p = $("p").width(70+'%').addClass('wayPointName'),
		$button = $('<button/>',
			{
				text: 'X'
			})
			.addClass('closeButton')
			.addClass('k-primary')
			.height('29px'),
		$div =  $("<div>");

	var initialize = function() {
		addPlaces(places);
		convertToKendo();
		$('.destinations').show();
	};

	var addPlaces = function(items) {
		handleBarConvert($('#places-template'), $('#places-container'), items);

		$("#places-container").kendoMultiSelect().data("kendoMultiSelect");
	};

	var convertToKendo = function() {
		$(document).ready(function(){
			$("#editSearch").kendoButton();
			$("#calcRoute").kendoButton();
			$("#addWayPoint").kendoButton();
			$("#findButton").kendoButton();
			$("#setLocation").kendoButton();

			$("#start").kendoMaskedTextBox();
			$("#waypoint").kendoMaskedTextBox();
			$("#end").kendoMaskedTextBox();
			$("#newLocation").kendoMaskedTextBox();
			$("#locationDistance").kendoMaskedTextBox();

			$("#mode").kendoComboBox();
		});
	};

	var addPoint = function(location) {
		var $currentDiv = $div.clone(),
			$currentP = $p.clone()
				.text(location),
			$currentButton = $button.clone()
				.attr('id', 'testButton')
				.click(function() {
					removePoint($(this));
				})
				.kendoButton();

		$currentDiv.append($currentP);
		$currentDiv.append($currentButton);
		$('#waypoints').append($currentDiv);
	};

	var removePoint = function(selector) {
		var height = $('.destinations').height() - 25,
			currentPoint = selector.parent().find($('.wayPointName')).text();

		map.removePoint(currentPoint);
		selector.parent().remove();
		$('.destinations').height(height+'px');
	};

	var addTopFive = function(items) {
		$('#topFive-container').text('');
		if (items.length > 0) {
			handleBarConvert($('#topFive-template'), $('#topFive-container'), items);
		}
	};

	function handleBarConvert(template, container, items) {
		var currentTemplate = Handlebars.compile(template.html());

		container.html(currentTemplate({
			places : items
		}));
	}

	return {
		initialize: initialize,
		addPoint: addPoint,
		addTopFive: addTopFive
	};
});