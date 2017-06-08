'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

    pageWrap: function pageWrap(isOpen, width, height, position, breakpoint) {
        if (window.innerWidth < breakpoint) {
            switch (position) {
                case 'right':
                    return {
                        MozTransform: isOpen ? '' : 'translate3d(-' + width + 'px, 0, 0)',
                        MsTransform: isOpen ? '' : 'translate3d(-' + width + 'px, 0, 0)',
                        OTransform: isOpen ? '' : 'translate3d(-' + width + 'px, 0, 0)',
                        WebkitTransform: isOpen ? '' : 'translate3d(-' + width + 'px, 0, 0)',
                        transform: isOpen ? '' : 'translate3d(-' + width + 'px, 0, 0)',
                        transition: 'transform 0.5s'
                    };

                default:
                    return {
                        MozTransform: isOpen ? '' : 'translate3d(' + width + 'px, 0, 0)',
                        MsTransform: isOpen ? '' : 'translate3d(' + width + 'px, 0, 0)',
                        OTransform: isOpen ? '' : 'translate3d(' + width + 'px, 0, 0)',
                        WebkitTransform: isOpen ? '' : 'translate3d(' + width + 'px, 0, 0)',
                        transform: isOpen ? '' : 'translate3d(' + width + 'px, 0, 0)',
                        transition: 'transform 0.5s'
                    };
            }
        }
        switch (position) {
            case 'bottom':
                return {
                    width: '100%'
                };

            default:
                return {
                    width: isOpen ? '100%' : 'calc(100% - ' + width + 'px)',
                    position: 'absolute',
                    right: position === 'right' ? 'initial' : '0',
                    left: position === 'right' ? '0' : 'initial',
                    top: '0',
                    transition: 'width 0.5s'
                };
        }
    },

    outerContainer: function outerContainer(isOpen) {
        return {
            overflow: isOpen ? '' : 'hidden'
        };
    }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];