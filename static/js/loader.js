"use strict";
/*
 by @neltic on 2015-01-01
 need jQuery v1.10+
 
 Create a loader message
 */
var loader = {
    id: 'loader', 				// CSS Id
    isBusy: false,
    delay: 1000, 				// until this time the message is displayed
    show: function (message) {
        var $loader = document.getElementById(this.id); 
        if ($loader === null) {
            $loader = document.createElement('div');
            $loader.id = this.id;
            $loader.innerHTML = '<div><p></p></div>';
            document.body.appendChild($loader);
        }        
        // create loading message
        var $current = document.createElement('div');
        $current.innerHTML = message.replace(/\n/g, '<br/>');
        $loader.getElementsByTagName('p')[0].parentElement.insertBefore($current, null);        
        // check is time to... 
        if (!this.isBusy) {
            this.isBusy = true;
            setTimeout(function () {
                if (loader.isBusy) {
                    loader.fadeIn();
                }
            }, this.delay);
        }
    },
    hide: function () {
        this.isBusy = false;
        loader.fadeOut();
        this.clear();
    },
    clear: function () {
        var $messages = document.querySelector('#' + this.id + ' > div').getElementsByTagName('div');
        if ($messages.length > 0) {
            for (var i = $messages.length - 1; i >= 0; --i) {
                $messages[i].remove();
            }
        }
    },
    fadeIn: function () {
        var $loader = document.getElementById(this.id); 
        $loader.style.opacity = 0;
        $loader.style.display = 'block';
        (function fade() {
            let val = parseFloat($loader.style.opacity);            
            if (!((val += 0.1) > 1)) { 
                $loader.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    },
    fadeOut: function() {
        var $loader = document.getElementById(this.id); 
        $loader.style.opacity = 1;
        (function fade() {            
            if (($loader.style.opacity -= 0.2) < 0) {
                $loader.style.display = 'none';
            } else {
                requestAnimationFrame(fade);
            }
        })();
    }
};