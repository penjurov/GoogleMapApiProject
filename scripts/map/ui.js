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
        };

        var removePoint = function(selector) {
            var height = $('.destinations').height() - 25,
                currentPoint = selector.parent().find($('.wayPointName')).text();

            map.removePoint(currentPoint);
            selector.parent().remove();
            $('.destinations').height(height+'px');
        };

        UI.prototype.addPlaces = function(items) {
            handleBarConvert($('#places-template'), $('#places-container'), items);

            $("#places-container").kendoMultiSelect().data("kendoMultiSelect");
        };

        UI.prototype.addTopFive = function(items) {
            $('#topFive-container').text('');
            if (items.length >0 ) {
               handleBarConvert($('#topFive-template'), $('#topFive-container'), items);
            }
        };

        function handleBarConvert(template, container, items) {
            var currentTemplate = Handlebars.compile(template.html());

            container.html(currentTemplate({
                places : items
            }));
        }

        return UI;
    })();

    return UI;
});