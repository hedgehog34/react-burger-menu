'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

    menuWrap: function menuWrap(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };

            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };

            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
                };
        }
    },

    item: function item(isOpen, width, height, position, breakpoint, nthChild, children) {
        switch (position) {
            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + (children + 1 - nthChild) * -500 + 'px, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
                };

            default:
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
                    transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
                };
        }
    }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];