(function () {
	require.config({
		paths: {
			"jquery": "libs/jquery.min",
			"bootstrap": "libs/bootstrap.min",
			kendo: "libs/kendo.web.min",
			handlebars: "libs/handlebars",
			underscore: "libs/underscore",
			async: 'libs/async',
			map: "map/map",
			events : "map/events",
			ui: "map/ui"
		},
		shim: {
        "jquery.bootstrap": {
            deps: ["jquery"]
        }
    }
	});

	require(["map", "ui", "events", , "jquery", "bootstrap"], function (Map, UI) {
		map = new Map();
		ui = new UI();
		map.initialize();
	});
}());