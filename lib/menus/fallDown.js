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
            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    transform: isOpen ? '' : 'translate3d(0, -100%, 0)',
                    transition: 'all 0.5s ease-in-out'
                };

            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    transform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                    transition: 'all 0.5s ease-in-out'
                };
        }
    },

    pageWrap: function pageWrap(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: 'all 0.5s'
                };

            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: 'all 0.5s'
                };

            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, -' + height + ', 0)',
                    transition: 'all 0.5s'
                };

            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0)',
                    transition: 'all 0.5s'
                };
        }
    },

    outerContainer: function outerContainer(isOpen) {
        return {
            perspective: '1500px',
            perspectiveOrigin: '0% 50%',
            overflow: isOpen ? '' : 'hidden'
        };
    }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];