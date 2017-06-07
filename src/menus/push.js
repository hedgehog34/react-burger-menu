'use strict';

import menuFactory from '../menuFactory';

const styles = {

  pageWrap(isOpen, width, height, position) {
      switch (position) {
          case 'right':
              return {
                  MozTransform: isOpen ? '' : `translate3d(-${width}px, 0, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(-${width}px, 0, 0)`,
                  OTransform: isOpen ? '' : `translate3d(-${width}px, 0, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(-${width}px, 0, 0)`,
                  transform: isOpen ? '' : `translate3d(-${width}px, 0, 0)`,
                  transition: 'all 0.5s',
              };

          case 'left':
              return {
                  MozTransform: isOpen ? '' : `translate3d(${width}px, 0, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(${width}px, 0, 0)`,
                  OTransform: isOpen ? '' : `translate3d(${width}px, 0, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(${width}px, 0, 0)`,
                  transform: isOpen ? '' : `translate3d(${width}px, 0, 0)`,
                  transition: 'all 0.5s',
              };

          case 'bottom':
              return {
                  MozTransform: isOpen ? '' : `translate3d(0, -${height}px, 0)`,
                  MsTransform: isOpen ? '' : `translate3d(0, -${height}px, 0)`,
                  OTransform: isOpen ? '' : `translate3d(0, -${height}px, 0)`,
                  WebkitTransform: isOpen ? '' : `translate3d(0, -${height}px, 0)`,
                  transform: isOpen ? '' : `translate3d(0, -${height}px, 0)`,
                  transition: 'all 0.5s',
              };
      }
  },

  outerContainer(isOpen) {
    return {
      overflow: isOpen ? '' : 'hidden',
    };
  }
};

export default menuFactory(styles);
