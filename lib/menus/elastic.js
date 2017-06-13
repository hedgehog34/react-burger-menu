'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _snapsvgImporter = require('../snapsvgImporter');

var _snapsvgImporter2 = _interopRequireDefault(_snapsvgImporter);

var _menuFactory = require('../menuFactory');

var _menuFactory2 = _interopRequireDefault(_menuFactory);

var styles = {

    svg: {
        lib: _snapsvgImporter2['default'],
        pathInitial: 'M-1,0h101c0,0-97.833,153.603-97.833,396.167C2.167,627.579,100,800,100,800H-1V0z',
        pathOpen: 'M-1,0h101c0,0,0-1,0,395c0,404,0,405,0,405H-1V0z',
        animate: function animate(path) {
            path.animate({ path: this.pathOpen }, 400, window.mina.easeinout);
        }
    },

    morphShape: function morphShape(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    width: 120,
                    height: '100%',
                    right: 'inherit',
                    left: 0,
                    MozTransform: 'rotateY(180deg)',
                    MsTransform: 'rotateY(180deg)',
                    OTransform: 'rotateY(180deg)',
                    WebkitTransform: 'rotateY(180deg)',
                    transform: 'rotateY(180deg)'
                };

            case 'left':
                return {
                    position: 'fixed',
                    width: 120,
                    height: '100%',
                    right: 0,
                    left: 'inherit',
                    MozTransform: '',
                    MsTransform: '',
                    OTransform: '',
                    WebkitTransform: '',
                    transform: ''
                };

            case 'bottom':
                return {
                    position: 'fixed',
                    width: '100%',
                    height: 'calc(' + height + ' - 120px)',
                    right: 'inherit',
                    left: 'inherit',
                    MozTransform: 'rotateY(90deg)',
                    MsTransform: 'rotateY(90deg)',
                    OTransform: 'rotateY(90deg)',
                    WebkitTransform: 'rotateY(90deg)',
                    transform: 'rotateY(90deg)'
                };
        }
    },

    menuWrap: function menuWrap(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
                    transition: 'all 0.3s'
                };

            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transition: 'all 0.3s'
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

    menu: function menu(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    right: 0,
                    width: 'calc(100% - 120px)',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                };

            case 'left':
                return {
                    position: 'fixed',
                    right: 'inherit',
                    width: 'calc(100% - 120px)',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                };

            case 'bottom':
                return {
                    position: 'fixed',
                    right: 'inherit',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    overflow: 'visible'
                };
        }
    },

    itemList: function itemList(isOpen, width, height, position) {
        if (position === 'right') {
            return {
                position: 'relative',
                left: '-110px',
                width: '170%',
                overflow: 'auto'
            };
        }
    },

    pageWrap: function pageWrap(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-100px, 0, 0)',
                    transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
                };

            case 'left':
                return {
                    MozTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    transform: isOpen ? '' : 'translate3d(100px, 0, 0)',
                    transition: isOpen ? 'all 0.3s' : 'all 0.3s 0.1s'
                };

            default:
                return;
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