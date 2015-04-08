/*
    Notification
    ========================

    @file      : Notification.js
    @version   : 2.0
    @author    : Bailey Everitt
    @date      : Tue, 07 Apr 2015 17:29:58 GMT
    @copyright : 
    @license   : MIT License

    Documentation
    ========================
    This widget shows a notification based on the noty jQuery plugin
*/

require({
    packages: [
        { 
            name: 'jquery', 
            location: '../../widgets/Notification/lib', 
            main: 'jquery-1.11.2.min' },
        { 
            name: 'noty', 
            location: '../../widgets/Notification/lib', 
            main: 'jquery.noty.packaged.min' }
        ]
}, [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
    'jquery', 'noty', 'dojo/text!Notification/widget/template/Notification.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, $, noty, widgetTemplate) {
    'use strict';
    
    return declare('Notification.widget.Notification', [ _WidgetBase, _TemplatedMixin ], {
        
        templateString: widgetTemplate,

        display: false,
        text: "",
        layout: "",
        type: "",
        timeout: "",
        onclickmf: "",

        _handle: null,
        _contextObj: null,
        _objProperty: null,

        constructor: function () {
            this._objProperty = {};
        },

        postCreate: function () {
            console.log(this.id + '.postCreate');
        },

        update: function (obj, callback) {
            console.log(this.id + '.update');

            if (obj != null) {
                
                this._contextObj = obj;
                
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
            }

            callback();
        },

        uninitialize: function () {

        }
        
    });
});
