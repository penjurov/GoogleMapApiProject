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

	// Initialize the UI
	var initialize = function() {
		addPlaces(places);
		convertToKendo();
		$('.destinations').show();
	};

	// Adding place types from JSON array to Kendo multiselect
	var addPlaces = function(items) {
		handleBarConvert($('#places-template'), $('#places-container'), items);

		$("#places-container").kendoMultiSelect().data("kendoMultiSelect");
	};

	// Converting all UI elements to Kendo
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

	// Show only Directions panel
	var showDirectionsPanel = function() {
		$('#destinations-panel').hide();
		var height = $(window).height() - 75;
		$('#direction-panel').height(height);
		$('#direction-panel').show();
	};

	// Show only Destinations panel
	var showDestinationsPanel = function() {
		$('#direction-panel').hide();
		$('#places-panel').hide();
		$('#destinations-panel').show();
	};

	// show only Places panel
	var showPlacesPanel = function() {
		$('#destinations-panel').hide();
		$('#direction-panel').hide();
		$('#places-panel').show();

		var multiSelect = $('#places-container').data("kendoMultiSelect");
		multiSelect.value([]);

		$('#topFive-container').html('');
	};

	// Adding Way Point elements in the DOM
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

	// Removing selected waypoint elements from DOM
	var removePoint = function(selector) {
		var height = $('.destinations').height() - 25,
			currentPoint = selector.parent().find($('.wayPointName')).text();

		selector.parent().remove();
		$('.destinations').height(height+'px');
	};

	// Adding top five place elements to DOM
	var addTopFive = function(items) {
		$('#topFive-container').text('');
		if (items.length > 0) {
			handleBarConvert($('#topFive-template'), $('#topFive-container'), items);
		}
	};

	// Handlebar templates
	function handleBarConvert(template, container, items) {
		var currentTemplate = Handlebars.compile(template.html());

		container.html(currentTemplate({
			places : items
		}));
	}

	return {
		initialize: initialize,
		addPoint: addPoint,
		removePoint: removePoint,
		addTopFive: addTopFive,
		showDestinationsPanel: showDestinationsPanel,
		showDirectionsPanel: showDirectionsPanel,
		showPlacesPanel: showPlacesPanel
	};
});