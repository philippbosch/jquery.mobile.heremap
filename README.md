jquery.mobile.heremap
=====================

A [jQuery Mobile](http://jquerymobile.com/) plugin that makes it easier to include a [HERE map](http://developer.here.com)
in your app.


Installation
------------

1. Download the [latest release](https://github.com/philippbosch/jquery.mobile.heremap/releases).
2. Unzip.
3. Copy `jquery.mobile.heremap.min.js` (smaller) or `jquery.mobile.heremap.js` (more readable) to your project directory.
4. Include the file in your HTML code, e.g. `<script src="js/jquery.mobile.heremap.min.js"></script>` after the jQuery Mobile JavaScript.


Prerequisites
-------------

In order to use HERE maps in you app you need to:

1. [Acquire credentials](http://developer.here.com/docs/maps_js/common/credentials.html) on the HERE Developer Portal.
2. You will get an *app id* and *app code*.
3. Configure the plugin with these credentials. This needs to happen after the inclusion of the plugin JS file, e.g.: 

```html
<script src="js/jquery.mobile.min.js"></script>
<script src="js/jquery.mobile.heremap.min.js"></script>
<script>
    $.mobile.heremap.app_id = 'your app id';
    $.mobile.heremap.app_code = 'your app code';
</script>
```
    
You can of course also put this code in an external file and reference this.


Basic Usage
-----------

For the most simple use case of just displaying a map you don't need to write any JavaScript code. In your HTML file include the widget like so:

```html
<div id="map" data-role="heremap" data-center="52.41326,13.05006" data-zoomlevel="16"></div>
```

You can customize the map with the following `data-` attributes:

| Attribute          | Description                                          | Example                                |
|--------------------|------------------------------------------------------|----------------------------------------|
| `data-center`      | the initial center of the map (latitude, longitude)  | `data-center="52.5,13.3"`              |
| `data-zoomlevel`   | the initial zoom level (integer)                     | `data-zoomlevel="10"`                  |
| `data-basemaptype` | one of the [available map types][1]                  | `data-basemaptype="SATELLITE"`         |
| `data-components`  | a comma-separated list of [UI components][2]         | `data-components="Behavior,ZoomBar"`   |


Advanced Usage
--------------

If you want to customize the map further (e.g. add markers, bind event listener), you can get a reference to the actual `nokia.maps.map.Display` instance using the `getMap` method:

```js
$('#map').on('heremapready', configureMap);

function configureMap() {
    var map = $('#map').heremap('getMap');
    // do something with map here
}
```

Or, even simpler: The `heremapready` event listener can accept a reference to the map object passed as the second parameter:

```js
$('#map').on('heremapready', configureMap);

function configureMap(event, map) {
    // do something with map here
}
```

License
-------

[MIT](http://philippbosch.mit-license.org/)



[1]: http://developer.here.com/docs/maps_js/topics/changing-map.html#map-types
[2]: http://developer.here.com/docs/maps_js/topics/map-components-and-ui.html
