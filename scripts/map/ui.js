define(["jquery", "places", "kendo", "handlebars"], function ($, places) {
	'use strict';
	var p = document.createElement('p'),
		button = document.createElement('button'),
		div =  document.createElement('div');

		p.style.width = '70%';
		p.className = p.className + "wayPointName ";

		button.className = button.className + "closeButton ";
		button.className = button.className + "k-primary ";
		button.style.height = '29px';

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
		var currentDiv = div.cloneNode(),
			currentP = p.cloneNode(),
			currentButton = button.cloneNode();

			currentP.innerHTML = location;

			currentButton.addEventListener('click');
			currentButton.innerHTML = 'X';

		currentDiv.appendChild(currentP);
		currentDiv.appendChild(currentButton);
		$('#waypoints').append(currentDiv);
		$('.closeButton').kendoButton();
	};

	var removePoint = function(selector) {
		var height = $('.destinations').height() - 25,
			currentPoint = selector.parent().find($('.wayPointName')).text();

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
		addTopFive: addTopFive,
		removePoint: removePoint
	};
});