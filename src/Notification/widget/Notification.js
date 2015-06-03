/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, document, jQuery */
/*mendix */
/*
    Notification
    ========================

    @file      : Notification.js
    @version   : 2.0
    @author    : Bailey Everitt
    @date      : T
    @copyright : 2015, Mendix B.V.
    @license   : Apache v2

    Documentation
    ========================
    This widget shows a notification based on the noty jQuery plugin
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style',
    'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text', 'dojo/html', 'dojo/_base/event',
    'Notification/lib/jquery-1.11.2.min', 'Notification/lib/jquery.noty.packaged.min',
    'dojo/text!Notification/widget/template/Notification.html'
], function (declare, _WidgetBase, _TemplatedMixin, 
              dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, 
              domConstruct, dojoArray, lang, text, html, event, 
              _jQuery, _noty,
              widgetTemplate) {
    'use strict';

    var $ = jQuery.noConflict(true);
    
    // Declare widget's prototype.
    return declare('Notification.widget.Notification', [_WidgetBase, _TemplatedMixin], {

        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,

        // Parameters configured in the Modeler.
        displayAttr: false,
        textAttr: "",
        layout: "",
        type: "",
        timeout: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,
        _objProperty: null,
        _notyNode: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._handles = [];
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            console.log(this.id + '.postCreate');
            this._updateRendering();
            this._setupEvents();
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            console.log(this.id + '.update');

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering();

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {},

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {},

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {},

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // Attach events to HTML dom elements
        _setupEvents: function () {},

        // Rerender the interface.
        _updateRendering: function () {
            if (this._contextObj !== null) {
                
                var shouldDisplay = this._contextObj.get(this.displayAttr);

                if (shouldDisplay == true) {
                    domStyle.set(this.domNode, 'display', 'block');
                    
                    var text = this._contextObj.get(this.textAttr);
                    var layout = this.layout;
                    var type = this.type;
                    var timeout = this.timeout;

                    if (timeout == "0") {
                        timeout = false
                    }

                    this._notyNode = noty({
                        text: text,
                        layout: layout,
                        type: type,
                        timeout: timeout
                    });
                } else if (this._notyNode) {
                    this._notyNode.close();
                }
            } else if (this._notyNode) {
                this._notyNode.close();
            }
        },

        // Reset subscriptions.
        _resetSubscriptions: function () {
            var _objectHandle = null,
                _displayAttrHandle = null,
                _textAttrHandle = null;

            // Release handles on previous object, if any.
            if (this._handles) {
                this._handles.forEach(function (handle, i) {
                    mx.data.unsubscribe(handle);
                });
                this._handles = [];
            }

            // When a mendix object exists create subscribtions. 
            if (this._contextObj) {
                _objectHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

                _displayAttrHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.displayAttr,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });

                _textAttrHandle = this.subscribe({
                    guid: this._contextObj.getGuid(),
                    attr: this.textAttr,
                    callback: lang.hitch(this, function (guid, attr, attrValue) {
                        this._updateRendering();
                    })
                });

                this._handles = [_objectHandle, _displayAttrHandle, _textAttrHandle];
            }
        }
    });
});
require(['Notification/widget/Notification'], function () {
    'use strict';
});