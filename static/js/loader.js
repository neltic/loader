"use strict";
/*
 by @neltic on 2015-01-01
 need jQuery v1.10+
 
 Create a loader message
 */
var loader = {
    id: 'loader', 				// CSS Id
    template: '<div>{0}</div>', // message template
    isBusy: false,
    delay: 1000, 				// until this time the message is displayed
    show: function (message) {
        var $loader = $('#' + this.id);
        if ($('#' + this.id).length === 0) {
            $loader = $('<div id="' + this.id + '"><div><p></p></div></div>');
            $('body').append($loader);
        }
        // create loading message
        var $current = $(this.template.replace('{0}', message.replace(/\n/g, '<br/>')));
        $current.insertBefore($loader.find('p'));
        // check is time to... 
        if (!this.isBusy) {
            this.isBusy = true;
            setTimeout(function () {
                if (loader.isBusy) {
                    $('#' + loader.id).fadeIn();
                }
            }, this.delay);
        }
    },
    hide: function () {
        this.isBusy = false;
        $('#' + this.id).fadeOut('slow');
        this.clear();
    },
    clear: function () {
        var $messages = $('#' + this.id + ' > div > div');
        if ($messages.length > 0) {
            $messages.remove();
        }
    }
};