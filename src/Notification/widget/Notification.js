/**
 Notification
 ========================

 @file      : Notification.js
 @version   : 1.0
 @author    : Bailey Everitt
 @date      : 12-09-2014
 @copyright : Mendix Technology BV
 @license   : Apache License, Version 2.0, January 2004

 Documentation
 =============
 This widget displays a custom message to the user
 based on the noty jQuery plugin

 */
dojo.provide("Notification.widget.Notification");
dojo.require("Notification.widget.lib.jquery-1-11-1-min");
dojo.require("Notification.widget.lib.jquery-noty-packaged-min");

console.log("Notification.js");

dojo.declare("Notification.widget.Notification", mxui.widget._WidgetBase, {

    inputargs: {
        display: false,
        text: "",
        layout: "",
        type: "",
        timeout: ""

    },

    postCreate: function () {
        console.log("Notification.js - postCreate");
        this.actLoaded();
    },

    update: function(obj, callback){
        console.log("Notification.js - update");

        var shouldDisplay = obj.get(this.display);

        if (shouldDisplay == true) {

            var text = obj.get(this.text);
            var layout = this.layout;
            var type = this.type;
            var timeout = this.timeout;

            if (timeout == "0") {
                timeout = false
            }

            var n = noty({
                text: text,
                layout: layout,
                type: type,
                timeout: timeout
            });

        }

        callback && callback();
    },

});
console.log("Notification.js - init done");