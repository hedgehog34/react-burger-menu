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
        pathInitial: 'M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z',
        pathOpen: 'M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z',
        animate: function animate(path) {
            var pos = 0;
            var steps = this.pathOpen.split(';');
            var stepsTotal = steps.length;
            var mina = window.mina;

            var nextStep = function nextStep() {
                if (pos > stepsTotal - 1) return;

                path.animate({ path: steps[pos] }, pos === 0 ? 400 : 500, pos === 0 ? mina.easein : mina.elastic, function () {
                    nextStep();
                });

                pos++;
            };

            nextStep();
        }
    },

    morphShape: function morphShape(isOpen, width, height, position) {
        switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    width: '100%',
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
                    width: '100%',
                    height: '100%',
                    right: 0,
                    left: 0,
                    MozTransform: 'rotateY(0deg)',
                    MsTransform: 'rotateY(0deg)',
                    OTransform: 'rotateY(0deg)',
                    WebkitTransform: 'rotateY(0deg)',
                    transform: 'rotateY(0deg)'
                };

            case 'bottom':
            case 'top':
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
                    transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
                };

            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)',
                    transition: isOpen ? 'transform 0.4s 0s' : 'transform 0.4s'
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
        width -= 140;
        switch (position) {
            case 'right':
                return {
                    position: 'fixed',
                    MozTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };

            case 'left':
                return {
                    position: 'fixed',
                    MozTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? '' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.1s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };

            case 'bottom':
            case 'top':
                return;
        }
    },

    item: function item(isOpen, width, height, position) {
        width -= 140;
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };

            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };

            case 'bottom':
            case 'top':
                return {
                    transition: isOpen ? 'opacity 0.3s 0.4s, transform 0.3s 0.4s' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
        }
    },

    closeButton: function closeButton(isOpen, width, height, position) {
        width -= 140;
        switch (position) {
            case 'right':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };

            case 'left':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(-' + width + ', 0, 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };

            case 'bottom':
                return {
                    MozTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    MsTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    OTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    WebkitTransform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(0, -' + height + ', 0)',
                    transition: isOpen ? 'opacity 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27), transform 0.3s 0.4s cubic-bezier(.17, .67, .1, 1.27)' : 'opacity 0s 0.3s cubic-bezier(.17, .67, .1, 1.27), transform 0s 0.3s cubic-bezier(.17, .67, .1, 1.27)',
                    opacity: isOpen ? 1 : 0
                };
        }
    }
};

exports['default'] = (0, _menuFactory2['default'])(styles);
module.exports = exports['default'];