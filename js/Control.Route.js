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
            container = L.DomUtil.create('div', className),
            options = this.options;
        this._addRouteControl(options, className, container);
        return container;
    },
    onRemove: function (map) {

    },
    _addRouteControl: function (options, className, container) {
//        $('<input/>').attr({ type: 'text', id: 'search-box', name: 'search-box' }).appendTo(container);
//        $('<input/>').attr({ type: 'button', id: 'search-button', name: 'search-button' }).appendTo(container).on('click', function(event){
//            alert($("#search-box").text());
//        });
        var $container =  $(container);
        var $searchBox = $('<input/>').attr({ type: 'text', id: 'search-box', name: 'search-box' });
        var $searchButton = $('<button>Search</button>').attr({ type: 'button', id: 'search-button', name: 'search-button' });
        var $style = $('<select>' +
            '<option value="fastest" selected="true">Fastest</option>' +
            '<option value="shortest">Shortest</option></select>');
        $container.append($searchBox).append($searchButton).append($style);
        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .on(container, 'click', stop)
            .on(container, 'mousedown', stop)
            .on(container, 'dblclick', stop);
        $searchButton.on('click',function(event){
            _queryRoute(
                {
                    input: $searchBox.val(),
                    style: $style.val()
                });
        });
    },
    _queryRoute: function(request){
        $.getJSON('',request, function(data){

        });
    }
});

L.control.route = function (options) {
    return new L.Control.Route(options);
};