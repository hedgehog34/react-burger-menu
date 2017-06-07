'use strict';

let styles = {

  overlay(isOpen) {
    return {
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.3)',
      opacity: isOpen ? 1 : 0,
      MozTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      MsTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      OTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      WebkitTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
      transform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
      transition: isOpen ? 'opacity 0.3s' : 'opacity 0.3s, transform 0s 0.3s'
    };
  },

  menuWrap(isOpen, width, height, position) {
    switch (position) {
        case 'right':
            return {
                position: 'fixed',
                right: 0,
                zIndex: 2,
                width,
                height: '100%',
                MozTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                MsTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                OTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                WebkitTransform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                transform: isOpen ? '' : 'translate3d(100%, 0, 0)',
                transition: 'all 0.5s'
            };

        case 'bottom':
            return {
                position: 'fixed',
                bottom: 0,
                zIndex: 2,
                width: '100%',
                height,
                MozTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                MsTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                OTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                WebkitTransform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                transform: isOpen ? '' : 'translate3d(0, 100%, 0)',
                transition: 'all 0.5s'
            };

        default:
            return {
                position: 'fixed',
                right: 'inherit',
                zIndex: 2,
                width,
                height: '100%',
                MozTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                MsTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                OTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                WebkitTransform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                transform: isOpen ? '' : 'translate3d(-100%, 0, 0)',
                transition: 'all 0.5s'
            };
    }
  },

  menu() {
    return {
      height: '100%',
      boxSizing: 'border-box'
    };
  },

  itemList() {
    return {
      height: '100%'
    };
  },

  item() {
    return {
      display: 'block',
      outline: 'none'
    };
  }

};

export default styles;
