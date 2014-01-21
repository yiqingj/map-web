/**
 * Created with JetBrains WebStorm.
 * User: yiqingj
 * Date: 6/6/13
 * Time: 5:52 PM
 * To change this template use File | Settings | File Templates.
 */
L.Control.Route = L.Control.extend({
    options: {
        position: 'topleft',
        url: ''
    },
    onAdd: function (map) {
        this._map = map;
        var className = 'tn-control-route',
            container = $("#route-control")[0],
            options = this.options;
        this._addRouteControl(options, className, container);
        return container;
    },
    onRemove: function (map) {

    },
    _addRouteControl: function (options, className, container) {
        var $container =  $(container);
        $container.show();
        var $searchBox = $("#route-control-input");
        var $searchButton = $('#route-control-button').button(
            {
                icons:{
                    primary:"ui-icon-search"
                }
            }
        );
        var $style = $( "#route-control-style" ).buttonset();
        var $routeList = $('#route-control-list');
        $routeList.hide();
        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .on(container, 'click', stop)
            .on(container, 'mousedown', stop)
            .on(container, 'dblclick', stop);
        var instance = this;
        $searchButton.on('click',function(event){
            instance._queryRoute(
                {
                    query: $searchBox.val(),
                    mode: $('form input[type=radio]:checked').val()
                });
        });
        this._originMarker.on('dragend',function(e){
            var query = $searchBox.val();
            var params = query.split(' ');
            var latlng = e.target.getLatLng();
            params[0] = latlng.lat+','+latlng.lng;
            $searchBox.val(params.join(' '));
        });
        this._map.addLayer(this._originMarker);
        this._map.addLayer(this._destinationMarker);
        this._map.addLayer(this._routeLayer);
        this._map.on('contextmenu', function(e){
            alert('aa');
            //do the menu.
        });
    },
    _queryRoute: function(input){
        var params = input.query.split(' ');
        var request = {
            origin : params[0],
            destination : params[1],
            mode : input.mode,
            edge_detail : true
        };
        var showOnMap = this._showRouteOnMap.bind(this);
        var showInList = this._showRouteInList.bind(this);
        $.getJSON('http://ec2-54-211-204-95.compute-1.amazonaws.com:8090/maps/v3/directions/json',request, function(data){
            showOnMap(request, data);
            showInList(data);
        });
    },
    _showRouteOnMap: function(request, data){
        this._originMarker.setLatLng(request.origin.split(','));
        this._destinationMarker.setLatLng(request.destination.split(','));
        var map = this._map;
        var routeLayer = this._routeLayer;
        routeLayer.clearLayers();
        var polyLine = new L.Polyline([this._originMarker.getLatLng(), this._destinationMarker.getLatLng()]);
        map.fitBounds(polyLine);
        $.each(data.route, function(index, route) {
            $.each(route.path, function(index, path) {// each route
                // path
                if (index > 0) {
                    return;
                }
                var latLngs = [];
                $.each(path.segment_index, function(index, segment_index) {// each
                    // edge
                    var segment = route.segment[segment_index];
                    $.each(segment.edge, function(index, edge){
                        var polyline = L.Polyline.fromEncoded(edge.encoded_polyline).addTo(routeLayer);
                        var arrowHead;
                        var popup = L.popup();
                        polyline.on('mouseover', function(e){
                            e.target.setStyle({color: 'red'});
                            arrowHead = L.polylineDecorator(polyline,{
                                patterns: [
                                    {offset: '50%', repeat: 0, symbol: new L.Symbol.ArrowHead({pixelSize: 10, polygon: false, pathOptions: {stroke: true}})}
                                ]
                            });
                            arrowHead.addTo(routeLayer);
                        });
                        polyline.on("mouseout", function(e){
                            e.target.setStyle({color: '#03f'});
                            routeLayer.removeLayer(arrowHead);
                        });
                        polyline.on("click", function(e){
                            polyline.bindPopup('<html>'+segment.turn_type+'</html>').openPopup();
                        });
                    });
                });
            });
        });
    },
    _showRouteInList : function(data){
        $('#route-list').add
    },
    _routeLayer : new L.LayerGroup(),
    _originMarker : L.marker([0,0], {
        icon : new L.Icon({
            iconUrl : 'images/markerstart.png',
            shadowUrl : 'images/marker-shadow2.png',
            iconSize : [20, 34],
            shadowSize : [37, 34],
            iconAnchor : [10,34],
            popupAnchor : [-1, -34]
        }),
        draggable : true
    }),
    _destinationMarker : L.marker([0,0], {
        icon : new L.Icon({
            iconUrl : 'images/markerend.png',
            shadowUrl : 'images/marker-shadow2.png',
            iconSize : [20, 34],
            shadowSize : [37, 34],
            iconAnchor : [10,34],
            popupAnchor : [-1, -34]
        }),
        draggable : true
    })
});

L.control.route = function (options) {
    return new L.Control.Route(options);
};
