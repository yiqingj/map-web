/**
 * Created with JetBrains WebStorm.
 * User: yiqingj
 * Date: 5/29/13
 * Time: 5:09 PM
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(
    function () {

        var map = L.map('map',{zoomControl: false}).setView([37.386966, -122.005186], 13);

        L.control.scale().addTo(map);
// create a CloudMade tile layer
        var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
            cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';

        var cloudmade = new L.TileLayer(cloudmadeUrl, {
            maxZoom: 18,
            attribution: cloudmadeAttribution
        });

// create a CloudMade tile layer
        var googleUrl = 'http://mt0.google.com/vt/v=w2.106&h1=en-US&x={x}&s=&y={y}&z={z}&s=Galile',
            googleAttribution = 'Map data &copy; 2012 Google';

        var google = new L.TileLayer(googleUrl, {
            maxZoom: 18,
            attribution: googleAttribution
        });

        map.addLayer(google);// default map layer
        var routeLayer = new L.LayerGroup();

        map.addLayer(routeLayer);

        var baseMaps = {
            "CloudMate": cloudmade,
            "google": google
        };

        var overlayMaps = {
            "Route": routeLayer
        };
        var layersControl = new L.Control.Layers(baseMaps, overlayMaps);

        map.addControl(layersControl);

        var routeControl = new L.Control.Route();
        routeControl.addTo(map);
    }
);
