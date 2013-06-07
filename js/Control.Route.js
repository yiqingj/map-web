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
        this._mRouteInput = L.DomUtil.create('div', className + '-input', container);
        $(this._mRouteInput).html('<input type="text" name="input-text">');
        var stop = L.DomEvent.stopPropagation;
        L.DomEvent
            .on(container, 'click', stop)
            .on(container, 'mousedown', stop)
            .on(container, 'dblclick', stop);
    }
});

L.control.route = function (options) {
    return new L.Control.Route(options);
};