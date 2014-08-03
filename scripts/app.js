(function () {
	require.config({
		paths: {
			jquery: "libs/jquery.min",
			sammy: "libs/sammy-latest.min",
			bootstrap: "libs/bootstrap.min",
			kendo: "libs/kendo.web.min",
			handlebars: "libs/handlebars",
			underscore: "libs/underscore",
			async: 'libs/async',
			starrating: 'libs/star-rating',
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

	require(["sammy", "map", "ui", "events", "jquery", "bootstrap", "starrating"], function (sammy, map, ui) {

		var app = sammy("#main-content", function() {
			this.get("#/", function () {
				map.initialize();
				ui.initialize();
				map.getCurrentLocation(7);
			});

			this.get("#/Destinations", function () {
				map.initialize();
				ui.initialize();
				ui.showDestinationsPanel();
				map.getCurrentLocation(7);
				$('.active').removeClass('active');
				$('#destinationsLink').addClass('active');
			});

			this.get("#/Places", function () {
				map.initialize();
				ui.initialize();
				ui.showPlacesPanel();
				map.getCurrentLocation(17);
				$('.active').removeClass('active');
				$('#placesLink').addClass('active');
			});
		});

		app.run("#/");
	});
}());