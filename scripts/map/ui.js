define(["jquery", "kendo"], function ($) {
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

        function removePoint(selector) {
            var height = $('.destinations').height() - 25,
                currentPoint = selector.parent().find($('.wayPointName')).text();

            map.removePoint(currentPoint);
            selector.parent().remove();
            $('.destinations').height(height+'px');
        }

        return UI;
    })();

    return UI;
});