define(["jquery", "kendo", "handlebars"], function ($) {
    'use strict';
    var UI = (function() {
        var $p = $("p").height(25+'px').width(75+'%')
                .addClass('wayPointName'),
            $button = $('<button/>',
                {
                    text: 'X'
                })
                .addClass('closeButton')
                .addClass('k-primary')
                .height('29px')
                .width('29px'),
            $div =  $("<div>").height('33px');

        function UI() {}

        UI.prototype.addPoint = function(location) {
            var $currentDiv = $div.clone(),
                $currentP = $p.clone()
                    .text(location),
                $currentButton = $button.clone()
                    .click(function() {
                        removePoint($(this));
                    })
                    .kendoButton();

            $currentDiv.append($currentP);
            $currentDiv.append($currentButton);
            $('#waypoints').append($currentDiv);
        };

        UI.prototype.convertToKendo = function() {
            $("#editSearch").kendoButton();
            $("#submitButton").kendoButton();
            $("#addButton").kendoButton();
            $("#findButton").kendoButton();

            $("#start").kendoMaskedTextBox();
            $("#waypoint").kendoMaskedTextBox();
            $("#end").kendoMaskedTextBox();
            $("#newLocation").kendoMaskedTextBox();
            $("#locationDistance").kendoMaskedTextBox();

            $("#mode").kendoComboBox();
      };

        var removePoint = function(selector) {
            var height = $('.destinations').height() - 25,
                currentPoint = selector.parent().find($('.wayPointName')).text();

            map.removePoint(currentPoint);
            selector.parent().remove();
            $('.destinations').height(height+'px');
        };

        UI.prototype.addPlaces = function(items) {
            var placesTemplate = Handlebars.compile($('#places-template').html());

            $('#places-container').html(placesTemplate({
                places : items
            }));

            $("#places-container").kendoMultiSelect().data("kendoMultiSelect");
        };

        return UI;
    })();

    return UI;
});