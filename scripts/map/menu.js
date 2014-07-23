define(["jquery"], function ($) {
	'use strict';
	var Menu;
	Menu = (function () {
		function Menu(menu, container) {
			this._menu = menu;
			this._container = container;
		}

		Menu.prototype.draw = function () {
			var self = this;

			if (self._menu.html() === undefined) {
				var menuHTML = localStorage.getItem("menuHTML");
				self._container.html(menuHTML);
			}
			else {
				localStorage.setItem("menuHTML", self._container.html());
			}

			$(document).ready(function () {
				var currentList = self._container.children();
				currentList.kendoMenu();
			});
		};

		return Menu;
	})();

	return Menu;
});
