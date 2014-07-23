(function () {
	require.config({
		paths: {
			"jquery": "libs/jquery.min",
			"bootstrap": "libs/bootstrap.min",
			kendo: "libs/kendo.web.min",
			handlebars: "libs/handlebars",
			underscore: "libs/underscore",
			async: 'libs/async',
			"starrating": 'libs/star-rating',
			map: "map/map",
			events : "map/events",
			ui: "map/ui",
			places : "map/places"
		},
		shim: {
			"bootstrap": {
				deps: ["jquery"]
			},
			"starrating": {
				deps: ["jquery"]
			}
    }
	});

	require(["map", "ui", "places", "events", "jquery", "bootstrap", "starrating"], function (Map, UI, places) {
		map = new Map();
		map.initialize();

		ui = new UI();
		ui.addPlaces(places);
		ui.convertToKendo();
	});
}());