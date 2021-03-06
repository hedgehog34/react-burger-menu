'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

    pageWrap: function pageWrap(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    MsTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    OTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    transform: isOpen ? '' : 'translate3d(-100px, 0, -600px) rotateY(20deg)',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s',
                    overflow: isOpen ? '' : 'hidden'
                };

            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    MsTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    OTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    transform: isOpen ? '' : 'translate3d(100px, 0, -600px) rotateY(-20deg)',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.5s',
                    overflow: isOpen ? '' : 'hidden'
                };

            case 'bottom':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    MsTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    OTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    transform: isOpen ? '' : 'translate3d(0, -' + height + ', 0) rotateX(25deg)',
                    transition: 'all 0.5s'
                };

            case 'top':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    MsTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    OTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    WebkitTransform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    transform: isOpen ? '' : 'translate3d(0, ' + height + ', 0) rotateX(25deg)',
                    transition: 'all 0.5s'
                };
        }
    },

    outerContainer: function outerContainer(isOpen) {
        return {
            perspective: '1500px',
            overflow: isOpen ? '' : 'hidden'
        };
    }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];