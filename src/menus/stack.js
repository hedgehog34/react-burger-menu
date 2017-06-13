'use strict';

import menuFactory from '../menuFactory';

const styles = {

  menuWrap(isOpen, width, height, position) {
      switch (position) {
          case 'right':
              return {
                  MozTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  OTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  transform: isOpen ? '' : `translate3d(${width}, 0, 0)`,
                  transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
              };

          case 'left':
              return {
                  MozTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  OTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  transform: isOpen ? '' : `translate3d(-${width}, 0, 0)`,
                  transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
              };

          case 'bottom':
              return {
                  MozTransform: isOpen ? '' : `translate3d(0, ${height}, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(0, ${height}, 0)`,
                  OTransform: isOpen ? '' : `translate3d(0, ${height}, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(0, ${height}, 0)`,
                  transform: isOpen ? '' : `translate3d(0, ${height}, 0)`,
                  transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)'
              };
      }
  },

  item(isOpen, width, height, position, breakpoint, nthChild) {
    return {
      MozTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      MsTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      OTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      WebkitTransform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      transform: isOpen ? '' : 'translate3d(0, ' + nthChild * 500 + 'px, 0)',
      transition: isOpen ? 'transform 0.8s cubic-bezier(0.7, 0, 0.3, 1)' : 'transform 0s 0.2s cubic-bezier(0.7, 0, 0.3, 1)'
    };
  }
};

export default menuFactory(styles);
