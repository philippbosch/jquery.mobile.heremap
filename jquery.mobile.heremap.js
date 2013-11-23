(function($) {
    if (!('nokia' in window)) {
        alert('Please make sure you have included the HERE Maps API for JavaScript in your HTML file before the jquery.heremaps plugin. See: http://developer.here.com/javascript-apis/documentation/maps');
        return false;
    }

    $.widget('mobile.heremap', $.mobile.widget, {
        options: {
            center: [0,0],
            zoomlevel: 10,
            basemaptype: null,
            height: '400px',
            components: []
        },

        _create: function() {
            if (nokia.Settings.app_id == '' && $.mobile.heremap.app_id) {
                nokia.Settings.set('app_id', $.mobile.heremap.app_id);
            }
            if (nokia.Settings.app_code == '' && $.mobile.heremap.app_code) {
                nokia.Settings.set('app_code', $.mobile.heremap.app_code);
            }

            var $elem = this.element;

            if ($elem.height() == 0) {
                $elem.height(this.options.height);
            }

            var mapOptions = {
                center: this._getCenter(),
                zoomLevel: this._getZoomLevel(),
                components: this._getComponents()
            };

            if (this.options.basemaptype) {
                mapOptions['baseMapType'] = this._getBaseMapType();
            }

            this._map = new nokia.maps.map.Display($elem.get(0), mapOptions);

            this._map.addListener('displayready', function () {
                $elem.trigger('heremapready');
            });
        },

        _init: function() {
        },

        _getCenter: function() {
            var value = this.options.center;
            if (typeof value == 'string') {
                var coords = $.splitAndTrim(value);
                value = [
                    parseFloat(coords[0]),
                    parseFloat(coords[1])
                ];
            }
            return value;
        },

        _getZoomLevel: function() {
            return this.options.zoomlevel;
        },

        _getBaseMapType: function() {
            var value = this.options.basemaptype;
            if (typeof value == 'string') {
                value = nokia.maps.map.Display[value.toUpperCase()]
            }
            return value;
        },

        _getComponents: function() {
            var components = this.options.components;
            if (typeof components == 'string') {
                components = $.splitAndTrim(components);
            }
            var c = [];
            $.each(components, function(i, component) {
                if (typeof component == 'string') {
                    component = new nokia.maps.map.component[component]();
                }
                c.push(component);
            });
            return c;
        },

        getMap: function() {
            return this._map;
        },

        setCenter: function(center) {
            this.option('center', center);
            this._map.setCenter(this._getCenter());
        },

        setZoomLevel: function(level) {
            this.option('zoomlevel', level);
            this._map.setZoomLevel(this.options.zoomlevel);
        },

        setBaseMapType: function(type) {
            this.option('basemaptype', type);
            this._map.setBaseMapType(this._getBaseMapType());
        },

        setComponents: function(components) {
            this.option('components', components);
            $.each(this._getComponents(), function(i, component) {
                this._map.addComponent(component);
            })
        }
    });

    // $(document).bind ("pagecreate create", function (e) {
    //     $(":jqmData(role=heremap)", e.target).heremap();
    // });

    $.splitAndTrim = function(s, separator) {
        if (!separator) {
            separator = ',';
        }
        var parts = s.split(separator);
        var a = [];
        for (var i=0, l=parts.length; i<l; i++) {
            a.push($.trim(parts[i]));
        }
        return a;
    }
}(jQuery));
